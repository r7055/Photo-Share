using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Service.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IRepositoryManager _repositoryManager;

        public StatisticsService(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public async Task<StatisticsDto> GetStatisticsAsync(int days)
        {
            StatisticsDto statistics = new StatisticsDto
            {
                TotalAlbums = await _repositoryManager.Album.CountAsync(),
                TotalPhotos = await _repositoryManager.Photo.CountAsync(),
                TotalShares = await _repositoryManager.AlbumShare.CountAsync() + await _repositoryManager.PhotoShare.CountAsync(),
                TotalUsers = await _repositoryManager.User.CountAsync(),
                NewAlbums = await _repositoryManager.Album.CountAsync(a => a.CreatedAt >= DateTime.Now.AddDays(-days)),
                NewPhotos = await _repositoryManager.Photo.CountAsync(p => p.CreatedAt >= DateTime.Now.AddDays(-days)),
                NewUsers = await _repositoryManager.User.CountAsync(u => u.CreatedAt >= DateTime.Now.AddDays(-days)),
                StorageUsed = (await _repositoryManager.Photo.GetAllAsync()).Sum(p => p.Size)
            };

            return statistics;
        }

        public async Task<int[]> GetUserActivityDataAsync(int days)
        {
            var startDate = DateTime.Now.Date.AddDays(-days + 1);
            var userActivity = new int[days];

            for (int i = 0; i < days; i++)
            {
                var currentDate = startDate.AddDays(i);
                var nextDate = currentDate.AddDays(1);

                userActivity[i] = await _repositoryManager.User.CountAsync(u =>
                    u.LastLogin >= currentDate && u.LastLogin < nextDate);
            }

            return userActivity;
        }

        public async Task<int[]> GetUploadsDataAsync(int days)
        {
            var startDate = DateTime.Now.Date.AddDays(-days + 1);
            var uploadsData = new int[days];

            for (int i = 0; i < days; i++)
            {
                var currentDate = startDate.AddDays(i);
                var nextDate = currentDate.AddDays(1);

                uploadsData[i] = await _repositoryManager.Photo.CountAsync(p =>
                    p.CreatedAt >= currentDate && p.CreatedAt < nextDate);
            }

            return uploadsData;
        }

        public async Task<SharesDataDto> GetSharesDataAsync(int days)
        {
            var startDate = DateTime.Now.Date.AddDays(-days + 1);
            var sharesAlbums = new int[days];
            var sharesPhotos = new int[days];

            for (int i = 0; i < days; i++)
            {
                var currentDate = startDate.AddDays(i);
                var nextDate = currentDate.AddDays(1);

                // עכשיו משתמשים בתאריך יצירת השיתוף עצמו
                sharesAlbums[i] = await _repositoryManager.AlbumShare.CountAsync(s =>
                    s.CreatedAt >= currentDate && s.CreatedAt < nextDate && !s.IsDeleted);

                sharesPhotos[i] = await _repositoryManager.PhotoShare.CountAsync(s =>
                    s.CreatedAt >= currentDate && s.CreatedAt < nextDate && !s.IsDeleted);
            }

            return new SharesDataDto
            {
                SharesAlbums = sharesAlbums,
                SharesPhotos = sharesPhotos
            };
        }

        public async Task<StorageDataDto> GetStorageDataAsync()
        {
            var totalStorage = 1000000; // 1TB in MB - קבוע זה בהתאם לתוכנית שלך
            var usedStorage = (await _repositoryManager.Photo.GetAllAsync()).Sum(p => p.Size);
            var storageUsedPercent = totalStorage > 0 ? (usedStorage / totalStorage) * 100 : 0;

            return new StorageDataDto
            {
                StorageUsedPercent = Math.Round(storageUsedPercent, 2)
            };
        }
    }
}