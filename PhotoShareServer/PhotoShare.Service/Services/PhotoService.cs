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

                    if (photoDto.AlbumId != 0)
                    {
                        var photoAlbum = new AlbumPhoto() { AlbumId = photoDto.AlbumId, PhotoId = res.Id };
                        await _repositoryManager.AlbumPhoto.AddAsync(photoAlbum);
                        await _repositoryManager.SaveAsync();
                    }

                    var tags = _mapper.Map<ICollection<Core.Models.Tag>>(photoDto.Tags);
                    await AddTagsToPhoto(res, tags);
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

        public async Task DeletePhotoAsync(int id, int albumId, int userId)
        {
            var photo = await _repositoryManager.Photo.GetByIdAsync(id);
            if (photo == null)
            {
                throw new Exception("Photo not found");
            }

            //check if the photo.userId is the owner of the photo
            //or he have the permission to delete the photo
            if (photo.OwnerId != userId)
            {
                throw new Exception("You dont have permission to delete this photo");
            }

            var albumPhoto = await _repositoryManager.AlbumPhoto.GetAlbumPhotoByAlbumIdAndPhotoId(albumId, id);
            if (albumPhoto == null)
            {
                throw new Exception("Photo not found in this album");
            }
            if (!albumPhoto.IsDeleted)
            {
                albumPhoto.IsDeleted = true;
                albumPhoto.DeletedAt = DateTime.Now;
                await _repositoryManager.AlbumPhoto.UpdateAsync(albumPhoto);
                await _repositoryManager.SaveAsync();
                return;
            }


            //delete the photo from the album
            await _repositoryManager.AlbumPhoto.DeleteAsync(albumPhoto.Id);

            //לבדוק אם התמונה קיימת באלבומים אחרים
            var albumPhotos = await _repositoryManager.AlbumPhoto.GetAlbumPhotosByPhotoId(id);
            if (albumPhotos == null || !albumPhotos.Any())
            {
                //delete the photo from users shared
                var photoShares = await _repositoryManager.PhotoShare.GetPhotoSharesByPhotoIdAsync(id);

                await _repositoryManager.Photo.DeleteAsync(id);
                //delete the photo from the aws3 bucket
                //var s3Client = new AmazonS3Client();
                //var deleteObjectRequest = new DeleteObjectRequest
                //{
                //    BucketName = "your-bucket-name",
                //    Key = "your-object-key"
                //};
                //await s3Client.DeleteObjectAsync(deleteObjectRequest);
            }
        }
        public async Task<IEnumerable<Photo>> GetPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _repositoryManager.Photo.GetPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        }

        public async Task<IEnumerable<Photo>> GetSharedPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _repositoryManager.Photo.GetSharedPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        }
        public async Task DeleteAsync(int id, int userId)
        {
            var photo = await _repositoryManager.Photo.GetByIdAsync(id);
            if (photo == null)
            {
                throw new Exception("Photo not found");
            }

            // Check if the user is the owner of the photo or has permission to delete it
            if (photo.OwnerId != userId)
            {
                throw new Exception("You do not have permission to delete this photo.");
            }

            // Delete the photo from the repository
            await _repositoryManager.Photo.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }

        public async Task<IEnumerable<PhotoDto>> GetRecyclePhotosAsync(int userId)
        {
            var AlbumsPhotos = await _repositoryManager.AlbumPhoto.GetRecyclePhotosAsync(userId);
            return _mapper.Map<IEnumerable<PhotoDto>>(AlbumsPhotos);
        }

        public async Task RestorePhotoAsync(int photoId, int albumId, int userId)
        {
            var photo = await _repositoryManager.Photo.GetByIdAsync(photoId);
            if (photo == null)
            {
                throw new Exception("Photo not found");
            }
            // Check if the user is the owner of the photo or has permission to restore it
            if (photo.OwnerId != userId)
            {
                throw new Exception("You do not have permission to restore this photo.");
            }
            var albumPhoto = await _repositoryManager.AlbumPhoto.GetAlbumPhotoByAlbumIdAndPhotoId(albumId, photoId);
            if (albumPhoto == null)
            {
                throw new Exception("Photo not found in this album");
            }
            if (!albumPhoto.IsDeleted)
            {
                throw new Exception("Photo is not deleted");
            }
            albumPhoto.IsDeleted = false;
            albumPhoto.DeletedAt = null;
            await _repositoryManager.AlbumPhoto.UpdateAsync(albumPhoto);
            await _repositoryManager.SaveAsync();
        }

        //public async Task<PhotoDto> CopyAsync(int photoId, int AlbumId)//ctrl c
        //{
        //    var photo = await _repositoryManager.Photo.GetByIdAsync(photoId);
        //    if (photo == null) throw new Exception("Photo not found");
        //    //check if this photo dont exist in this album

        //    var newAlbumPhoto = new AlbumPhoto
        //    {
        //        AlbumId = AlbumId,
        //        PhotoId = photoId
        //    };

        //    await _repositoryManager.AlbumPhoto.AddAsync(newAlbumPhoto);
        //    await _repositoryManager.SaveAsync();

        //    return _mapper.Map<PhotoDto>();
        //}

        //public async Task<PhotoDto> CutAsync(int photoId, int AlbumId)//ctrl x
        //{
        //    var photo = await _repositoryManager.Photo.GetByIdAsync(photoId);
        //    if (photo == null) throw new Exception("Photo not found");
        //    //check if this photo exist in this album 

        //    var albumPhoto = await _repositoryManager.AlbumPhoto.get;
        //    albumPhoto.isDelete = true;
        //    photo.UpdatedAt = DateTime.Now;

        //    await _repositoryManager.SaveAsync();
        //    return _mapper.Map<PhotoDto>(photo);
        //}

        //public async Task<PhotoDto> PasteAsync(PhotoDto photoDto)//ctrl v 
        //{
        //    var photo = _mapper.Map<Photo>(photoDto);
        //    await _repositoryManager.Photo.AddAsync(photo);
        //    await _repositoryManager.SaveAsync();

        //    return _mapper.Map<PhotoDto>(photo);
        //}
    }

}
