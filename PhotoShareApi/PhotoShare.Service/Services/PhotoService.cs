using Amazon.S3.Transfer;
using Amazon.S3;
using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;
using Amazon.S3.Model;

namespace PhotoShare.Service.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PhotoService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PhotoDto>> GetPhotosByAlbumId(int albumId)
        {
            var album = await _repositoryManager.Album.GetAlbumIncludePhotosAsync(albumId);

            if (album == null || album.AlbumPhotos == null || !album.AlbumPhotos.Any())
            {
                throw new Exception("Album not found or has no photos.");
            }

            var photos = album.AlbumPhotos.Select(ap => ap.Photo);

            return _mapper.Map<IEnumerable<PhotoDto>>(photos);
        }


        public async Task<IEnumerable<PhotoDto>> GetAllAsync()
        {
            var photos = await _repositoryManager.Photo.GetAllAsync();
            return _mapper.Map<IEnumerable<PhotoDto>>(photos);
        }

        public async Task<PhotoDto> GetByIdAsync(int id, int userId)
        {
            var photo = await _repositoryManager.Photo.GetByIdAsync(id);
            //check if the photo.userId is the owner of the photo
            //or he have the permission to get the photo
            return _mapper.Map<PhotoDto>(photo);
        }

        public async Task<PhotoDto> CreateAsync(PhotoDto photoDto)
        {
            using (var transaction = await _repositoryManager.BeginTransactionAsync())
            {
                try
                {
                    var photo = _mapper.Map<Photo>(photoDto);
                    photo.OwnerId = photoDto.UserId;
                    photo.CreatedAt = DateTime.Now;
                    photo.UpdatedAt = DateTime.Now;
                    photo.Tags = null;

                    var res = await _repositoryManager.Photo.AddAsync(photo);
                    await _repositoryManager.SaveAsync();

                    var photoAlbum = new AlbumPhoto() { AlbumId = photoDto.AlbumId, PhotoId = res.Id };
                    await _repositoryManager.AlbumPhoto.AddAsync(photoAlbum);
                    await _repositoryManager.SaveAsync();

                    var tags = _mapper.Map<ICollection<Core.Models.Tag>>(photoDto.Tags);
                    await AddTagsToPhoto(res,tags); 
                    await _repositoryManager.SaveAsync(); 

                    await _repositoryManager.PhotoShare.AddAsync(new Core.Models.PhotoShare()
                    {
                        PhotoId = res.Id,
                        UserId = photoDto.UserId,
                        Permission = PermissionType.Owner
                    });
                    await _repositoryManager.SaveAsync(); 

                    await transaction.CommitAsync(); 
                    return _mapper.Map<PhotoDto>(res);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync(); 
                    throw new Exception("An error occurred while creating the photo.", ex);
                }
            }
        }


        //private async Task AddTagsToPhoto(Photo photo, ICollection<Core.Models.Tag> tags)
        //{
        //    foreach (var tag in tags)
        //    {
        //        tag.Photos.Add(photo); // Add the photo to each tag
        //                               // Optionally, you can also add the tag to the repository if needed
        //        await _repositoryManager.Tag.AddAsync(tag); // Add tag if it's new
        //    }
        //}
        private async Task AddTagsToPhoto(Photo photo, ICollection<Core.Models.Tag> tags)
        {
            foreach (var tag in tags)
            {
                var existingTag = await _repositoryManager.Tag.GetByIdAsync(tag.Id);
                if (existingTag != null)
                {
                    existingTag.Photos.Add(photo);
                }
                else
                {
                    tag.Photos.Add(photo);
                    await _repositoryManager.Tag.AddAsync(tag);
                }
            }
        }


        public async Task<PhotoDto> UpdateAsync(PhotoDto photoDto)
        {
            var prevPhoto = await _repositoryManager.Photo.GetByIdAsync(photoDto.Id);
            if (prevPhoto == null)
            {
                throw new Exception("Photo not found");
            }
            //check if the photo.userId is the owner of the photo
            //or he have the permission to update the photo
            var photo = _mapper.Map<Photo>(photoDto);
            var updatePhoto = await _repositoryManager.Photo.UpdateAsync(photo);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<PhotoDto>(updatePhoto);
        }

        public async Task DeleteAsync(int id, int userId)
        {
            var photo = await _repositoryManager.Photo.GetByIdAsync(id);
            if (photo == null)
            {
                throw new Exception("Photo not found");
            }
            //check if the photo.userId is the owner of the photo
            //or he have the permission to delete the photo
            await _repositoryManager.Photo.DeleteAsync(id);
        }
        public async Task<IEnumerable<Photo>> GetPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _repositoryManager.Photo.GetPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        }

        public async Task<IEnumerable<Photo>> GetSharedPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _repositoryManager.Photo.GetSharedPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        }
    }

}
