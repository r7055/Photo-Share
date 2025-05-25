using PhotoShare.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IStatisticsService
    {
        Task<StatisticsDto> GetStatisticsAsync(int days);
        Task<int[]> GetUserActivityDataAsync(int days);
        Task<int[]> GetUploadsDataAsync(int days);
        Task<SharesDataDto> GetSharesDataAsync(int days);
        Task<StorageDataDto> GetStorageDataAsync();
    }
}