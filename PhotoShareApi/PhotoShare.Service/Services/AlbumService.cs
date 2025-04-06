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
            album.OwnerId = albumDto.UserId;
            if (album.ParentId == 0) album.ParentId = null;

            var albumCreated = await _repositoryManager.Album.AddAsync(album);
            await _repositoryManager.SaveAsync();

            var albumShareDto = new AlbumShareDto { AlbumId = albumCreated.Id, UserId = albumDto.UserId, Permission = PermissionType.Owner };
            await _repositoryManager.AlbumShare.AddAsync(_mapper.Map<AlbumShare>(albumShareDto));
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

            if (prevAlbum.OwnerId != albumDto.UserId)
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

        public async Task DeleteAsync(int id, int userId)
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

            await _repositoryManager.SaveAsync();
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
            return _mapper.Map<ICollection<AlbumDto>>(albumsRecycle);
        }
    }
}
