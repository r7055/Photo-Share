using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace PhotoShare.Service.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public AlbumService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AlbumDto>> GetAllAsync()
        {
            var albums = await _repositoryManager.Album.GetAllAsync();
            return _mapper.Map<IEnumerable<AlbumDto>>(albums);
        }

        public async Task<AlbumDto> GetByIdAsync(int id, int userId)
        {
            var album = await _repositoryManager.Album.GetByIdAsync(id);
            if (album == null)
            {
                throw new KeyNotFoundException("Album not found");
            }
            if (album.OwnerId != userId)
            {
                throw new UnauthorizedAccessException("You do not have permission for this album");
            }
            return _mapper.Map<AlbumDto>(album);
        }

        public async Task<AlbumDto> CreateAsync(AlbumDto albumDto)
        {
            var album = _mapper.Map<Album>(albumDto);
            album.CreatedAt = DateTime.Now;
            album.UpdatedAt = DateTime.Now;
            album.OwnerId = albumDto.OwnerId;
            if (album.ParentId == 0) album.ParentId = null;


            var albumCreated = await _repositoryManager.Album.AddAsync(album);
            await _repositoryManager.SaveAsync();

            var albumShare = new AlbumShare
            {
                AlbumId = albumCreated.Id,
                UserId = albumDto.OwnerId,
                Permission = PermissionType.Owner,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsDeleted = false
            };

            await _repositoryManager.AlbumShare.AddAsync(_mapper.Map<AlbumShare>(albumShare));
            await _repositoryManager.SaveAsync();

            return _mapper.Map<AlbumDto>(albumCreated);
        }

        public async Task<AlbumDto> UpdateAsync(AlbumDto albumDto)
        {
            var prevAlbum = await _repositoryManager.Album.GetByIdAsync(albumDto.Id);
            if (prevAlbum == null)
            {
                throw new InvalidOperationException("Entity not found.");
            }

            if (prevAlbum.OwnerId != albumDto.OwnerId)
            {
                throw new UnauthorizedAccessException("You do not have permission to update this album.");
            }

            prevAlbum.Title = albumDto.Title;
            prevAlbum.Description = albumDto.Description;
            prevAlbum.ParentId = albumDto.ParentId == 0 ? null : albumDto.ParentId;
            prevAlbum.UpdatedAt = DateTime.Now;

            await _repositoryManager.SaveAsync();
            return _mapper.Map<AlbumDto>(prevAlbum);
        }

        public async Task<AlbumDto> DeleteAsync(int id, int userId)
        {
            var album = await _repositoryManager.Album.GetAlbumIncludePhotosAsync(id);
            if (album == null)
            {
                throw new InvalidOperationException("Album not found.");
            }

            if (album.OwnerId != userId)
            {
                throw new UnauthorizedAccessException("You do not have permission to delete this album.");
            }

            if (album.IsDeleted)
            {
                var photoIds = album.AlbumPhotos.Select(ap => ap.Id).ToList();
                await _repositoryManager.AlbumPhoto.DeleteRangeAsync(photoIds);

                var shareIds = album.Users.Select(albumShare => albumShare.Id).ToList();
                await _repositoryManager.AlbumShare.DeleteRangeAsync(shareIds);

                //(await _repositoryManager.Album.GetAlbumsByParentAsync(id,userId)).ForEach(relatedAlbum => relatedAlbum.ParentId = null);
                var relatedAlbums = await _repositoryManager.Album.GetAlbumsByParentAsync(id, userId);
                foreach (var relatedAlbum in relatedAlbums)
                {
                    relatedAlbum.IsDeleted = true;
                    DeleteAsync(relatedAlbum.Id, relatedAlbum.OwnerId);
                }
                await _repositoryManager.Album.DeleteAsync(id);
            }
            else
            {
                album.IsDeleted = true;
            }

            album.DeletedAt = DateTime.Now;
            await _repositoryManager.SaveAsync();
            return _mapper.Map<AlbumDto>(album);
        }

        public async Task RestoreAlbumAsync(int id, int userId)
        {
            var album = await _repositoryManager.Album.GetAlbumIncludePhotosAsync(id);
            if (album == null)
            {
                throw new InvalidOperationException("Album not found.");
            }

            if (album.OwnerId != userId)
            {
                throw new UnauthorizedAccessException("You do not have permission to restore this album.");
            }

            album.IsDeleted = false;
            await _repositoryManager.SaveAsync();
        }

        public async Task<ICollection<Album>> GetAlbumsByParentAsync(int parentId, int userId)
        {
            return await _repositoryManager.Album.GetAlbumsByParentAsync(parentId, userId);
        }

        public async Task<ICollection<AlbumDto>> GetRecycleAlbumsAsync(int userId)
        {
            var albumsRecycle = await _repositoryManager.Album.GetRecycleAlbumsAsync(userId);
            if(albumsRecycle == null)
                return new List<AlbumDto>();
            return _mapper.Map<ICollection<AlbumDto>>(albumsRecycle);
        }
        public async Task<ICollection<AlbumDto>> GetTopAlbumsAsync()
        {
            var albums = await _repositoryManager.Album.GetAllAsync();
            var topAlbums = albums.OrderByDescending(a => a.CountViews).Take(5);

            return _mapper.Map<ICollection<AlbumDto>>(topAlbums);
        }
        public async Task<StatisticsDto> GetAlbumStatisticsAsync()
        {
            var totalAlbums = await _repositoryManager.Album.CountAsync();
            var newAlbums = await _repositoryManager.Album.CountAsync(a => a.CreatedAt >= DateTime.Now.AddDays(-30));

            return new StatisticsDto
            {
                TotalAlbums = totalAlbums,
                NewAlbums = newAlbums
            };
        }
    }
}
