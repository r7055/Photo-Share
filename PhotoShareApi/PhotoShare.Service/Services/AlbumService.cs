using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

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
            var album = await _repositoryManager.Album.GetByIdAsync(id, userId);
            return album != null ? _mapper.Map<AlbumDto>(album) : throw new SerializationException("you not have the permission of this album");
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
            //add permission to the manager 
            if (prevAlbum.OwnerId != albumDto.UserId)
            {
                throw new UnauthorizedAccessException("You do not have permission to update this album.");
            }

            var album = _mapper.Map<Album>(albumDto);
            if (album.ParentId == 0) album.ParentId = null;

            prevAlbum.Title = album.Title;
            prevAlbum.Description = album.Description;
            prevAlbum.ParentId = album.ParentId;
            prevAlbum.UpdatedAt = DateTime.Now;

            // עדכון האלבום בבסיס הנתונים
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
                album.AlbumPhotos = new List<AlbumPhoto>();
                await _repositoryManager.Album.DeleteAsync(id);
            }
            album.IsDeleted = true;
            await _repositoryManager.SaveAsync();
        }

        public async Task RestoreAlbumAsync(int id,int userId)
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

        //private async Task DeleteAlbumPhotosAsync(IEnumerable<Photo> photos, int albumId)
        //{
        //    if (photos == null) return;

        //    foreach (Photo photo in photos)
        //    {
        //        var albumToRemove = photo.Albums.FirstOrDefault(a => a.Id == albumId);
        //        if (albumToRemove != null)
        //        {
        //            photo.Albums.Remove(albumToRemove);
        //        }

        //        if (photo.Albums.Count == 0)
        //        {
        //            photo.IsDeleted = true;
        //            await _repositoryManager.Photo.DeleteAsync(photo.Id);
        //        }
        //    }
        //}

        public async Task<ICollection<Album>> GetAlbumsByParentAsync(int parentId, int userId)
        {
            return await _repositoryManager.Album.GetAlbumsByParentAsync(parentId, userId);
        }
    }

}
