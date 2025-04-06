using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;






namespace PhotoShare.Services
{
    public class ShareService : IShareService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ShareService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AlbumDto>> GetAlbumSharesByUser(int userId)
        {
            var shares = await _repositoryManager.AlbumShare.GetAlbumSharesByUserIdAsync(userId);
            var albumsShares = shares.Select(s => s.Album);
            return _mapper.Map<IEnumerable<AlbumDto>>(albumsShares);
        }

        public async Task<IEnumerable<PhotoDto>> GetImageSharesByUser(int userId)
        {
            var shares = await _repositoryManager.PhotoShare.GetSharesByUserEmailAsync(userId);
            var photosShare = await Task.WhenAll(shares.Select(s => _repositoryManager.Album.GetByIdAsync(s.PhotoId)));
            return _mapper.Map<IEnumerable<PhotoDto>>(photosShare);
        }

        public async Task CreateAlbumShare(AlbumShareDto albumShareDto)
        {

            if (albumShareDto == null)
            {
                throw new ArgumentNullException(nameof(albumShareDto));
            }


            var albumToShare = await _repositoryManager.Album.GetByIdAsync(albumShareDto.AlbumId);
            if (albumToShare == null)
            {
                throw new Exception("The album was not found.");
            }

            //if is not exiat 
            if (albumShareDto.UserId == albumToShare.OwnerId)
            {
                var share = _mapper.Map<AlbumShare>(albumShareDto);
                var user = await _repositoryManager.User.GetByUserEmailAsync(albumShareDto.UserEmailForSharing);
                share.UserId = user.Id;
                share.Permission = PermissionType.Read;
                await _repositoryManager.AlbumShare.AddAsync(share);
                await _repositoryManager.SaveAsync();
            }
            else
            {
                throw new Exception("The user is not the owner of the album.");
            }
        }


        public async Task CreateImageShare(PhotoShareDto imageShareDto)
        {
            if (imageShareDto == null)
            {
                throw new ArgumentNullException(nameof(imageShareDto));
            }

            var photoToShare = await _repositoryManager.Photo.GetByIdAsync(imageShareDto.PhotoId);
            if (photoToShare == null)
            {
                throw new Exception("The photo was not found.");
            }

            if (imageShareDto.UserId == photoToShare.OwnerId)
            {
                var share = _mapper.Map<PhotoShare.Core.Models.PhotoShare>(imageShareDto);
                var user = await _repositoryManager.User.GetByUserEmailAsync(imageShareDto.UserEmailForSharing);
                share.UserId = user.Id;
                share.Permission = PermissionType.Read;
                await _repositoryManager.PhotoShare.AddAsync(share);
                await _repositoryManager.SaveAsync();
            }
            else
            {
                throw new Exception("The user is not the owner of the photo.");
            }
        }

    }
}


