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
            var photos = (await _repositoryManager.Album.GetAlbumIncludePhotosAsync(albumId)).AlbumPhotos.Select(ap=>ap.Photo);
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
            var photo = _mapper.Map<Photo>(photoDto);
            var res = await _repositoryManager.Photo.AddAsync(photo);
            return _mapper.Map<PhotoDto>(res);
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

        public async Task DeleteAsync(int id,int userId)
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

    }

}
