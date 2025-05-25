//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;
//using PhotoShare.Core.DTOs;
//using PhotoShare.Core.IRepositories;
//using PhotoShare.Core.IServices;
//using PhotoShare.Core.Models;
//using System.Collections.Generic;
//using System.Threading.Tasks;






//namespace PhotoShare.Services
//{
//    public class ShareService : IShareService
//    {
//        private readonly IRepositoryManager _repositoryManager;
//        private readonly IMapper _mapper;

//        public ShareService(IRepositoryManager repositoryManager, IMapper mapper)
//        {
//            _repositoryManager = repositoryManager;
//            _mapper = mapper;
//        }

//        public async Task<IEnumerable<AlbumDto>> GetAlbumSharesByUser(int userId)
//        {

//            var shares = await _repositoryManager.AlbumShare.GetAlbumSharesByUserIdAsync(userId);
//            List<AlbumDto> albums = new List<AlbumDto>();
//            foreach ( var s in shares)
//            {
//                albums.Add(_mapper.Map<AlbumDto>(s.Album));
//            }
//            var albumsDto = _mapper.Map<List<AlbumDto>>(albums);
//            foreach (var album in albumsDto)
//            {
//                album.Owner= await _repositoryManager.User.GetByIdAsync(album.OwnerId);
//            }
//            return albumsDto;
//        }


//        public async Task<IEnumerable<PhotoDto>> GetImageSharesByUser(int userId)
//        {
//            var shares = await _repositoryManager.PhotoShare.GetSharesByUserEmailAsync(userId);
//            var photosShare = await Task.WhenAll(shares.Select(s => _repositoryManager.Album.GetByIdAsync(s.PhotoId)));
//            return _mapper.Map<IEnumerable<PhotoDto>>(photosShare);
//        }

//        public async Task CreateAlbumShare(AlbumShareDto albumShareDto)
//        {

//            if (albumShareDto == null)
//            {
//                throw new ArgumentNullException(nameof(albumShareDto));
//            }


//            var albumToShare = await _repositoryManager.Album.GetByIdAsync(albumShareDto.AlbumId);
//            if (albumToShare == null)
//            {
//                throw new Exception("The album was not found.");
//            }

//            //if is not existing user 
//            if (albumShareDto.UserId == albumToShare.OwnerId)
//            {
//                var share = _mapper.Map<AlbumShare>(albumShareDto);
//                var user = await _repositoryManager.User.GetByUserEmailAsync(albumShareDto.UserEmailForSharing);
//                if (user == null)
//                {
//                    throw new Exception("The user was not found.");
//                }
//                share.UserId = user.Id;
//                share.Permission = PermissionType.Read;
//                share.CreatedAt = DateTime.Now;
//                share.UpdatedAt = DateTime.Now;
//                share.IsDeleted = false;
//                await _repositoryManager.AlbumShare.AddAsync(share);
//                await _repositoryManager.SaveAsync();
//            }
//            else
//            {
//                throw new Exception("The user is not the owner of the album.");
//            }
//        }


//        public async Task CreateImageShare(PhotoShareDto imageShareDto)
//        {
//            if (imageShareDto == null)
//            {
//                throw new ArgumentNullException(nameof(imageShareDto));
//            }

//            var photoToShare = await _repositoryManager.Photo.GetByIdAsync(imageShareDto.PhotoId);
//            if (photoToShare == null)
//            {
//                throw new Exception("The photo was not found.");
//            }

//            if (imageShareDto.UserId == photoToShare.OwnerId)
//            {
//                var share = _mapper.Map<PhotoShare.Core.Models.PhotoShare>(imageShareDto);
//                var user = await _repositoryManager.User.GetByUserEmailAsync(imageShareDto.UserEmailForSharing);
//                if (user == null)
//                {
//                    throw new Exception("The user was not found.");
//                }
//                share.UserId = user.Id;
//                share.Permission = PermissionType.Read;
//                share.CreatedAt = DateTime.Now;
//                share.UpdatedAt = DateTime.Now;
//                share.IsDeleted = false;
//                await _repositoryManager.PhotoShare.AddAsync(share);
//                await _repositoryManager.SaveAsync();
//            }
//            else
//            {
//                throw new Exception("The user is not the owner of the photo.");
//            }
//        }
//        //public async Task<StatisticsDto> GetPhotoShareStatisticsAsync()
//        //{
//        //    var totalShares = await _repositoryManager.PhotoShare.CountAsync();
//        //    var albumShares = await _repositoryManager.AlbumShare.CountAsync();

//        //    return new StatisticsDto
//        //    {
//        //        TotalShares = totalShares + albumShares,
//        //    };
//        //}
//    }
//}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;

namespace PhotoShare.Services
{
    public class ShareService : IShareService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ShareService(IRepositoryManager repositoryManager, IMapper mapper, IEmailService emailService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<IEnumerable<AlbumDto>> GetAlbumSharesByUser(int userId)
        {
            var shares = await _repositoryManager.AlbumShare.GetAlbumSharesByUserIdAsync(userId);
            List<AlbumDto> albums = new List<AlbumDto>();

            foreach (var s in shares)
            {
                albums.Add(_mapper.Map<AlbumDto>(s.Album));
            }

            var albumsDto = _mapper.Map<List<AlbumDto>>(albums);
            foreach (var album in albumsDto)
            {
                album.Owner = await _repositoryManager.User.GetByIdAsync(album.OwnerId);
            }

            return albumsDto;
        }

        public async Task<IEnumerable<PhotoDto>> GetImageSharesByUser(int userId)
        {
            var shares = await _repositoryManager.PhotoShare.GetSharesByUserEmailAsync(userId);
            var photosShare = await Task.WhenAll(shares.Select(s => _repositoryManager.Photo.GetByIdAsync(s.PhotoId)));
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

            // בדיקה שהמשתמש הוא הבעלים של האלבום
            if (albumShareDto.UserId != albumToShare.OwnerId)
            {
                throw new Exception("The user is not the owner of the album.");
            }

            // חיפוש המשתמש לשיתוף
            var userToShareWith = await _repositoryManager.User.GetByUserEmailAsync(albumShareDto.UserEmailForSharing);
            if (userToShareWith == null)
            {
                throw new Exception("The user was not found.");
            }

            // בדיקה שלא משתפים עם עצמנו
            if (userToShareWith.Id == albumShareDto.UserId)
            {
                throw new Exception("You cannot share an album with yourself.");
            }

            // בדיקה שהאלבום לא כבר משותף עם המשתמש הזה
            var existingShare = await _repositoryManager.AlbumShare
                .GetAlbumSharesByUserIdAsync(userToShareWith.Id);

            if (existingShare.Any(s => s.AlbumId == albumShareDto.AlbumId))
            {
                throw new Exception("This album is already shared with this user.");
            }

            // יצירת השיתוף
            var share = _mapper.Map<AlbumShare>(albumShareDto);
            share.UserId = userToShareWith.Id;
            share.Permission = PermissionType.Read;
            share.CreatedAt = DateTime.Now;
            share.UpdatedAt = DateTime.Now;
            share.IsDeleted = false;

            await _repositoryManager.AlbumShare.AddAsync(share);
            await _repositoryManager.SaveAsync();

            // שליחת מייל להודעה
            try
            {
                var owner = await _repositoryManager.User.GetByIdAsync(albumShareDto.UserId);
                // Combine FirstName and LastName for the full owner name
                var ownerName = owner != null ? $"{owner.FirstName} {owner.LastName}" : "Someone";

                await _emailService.SendAlbumShareEmailAsync(
                    albumShareDto.UserEmailForSharing,
                    albumToShare.Title,
                    ownerName,
                    albumShareDto.Message
                );
            }
            catch (Exception)
            {
                // אם שליחת המייל נכשלה, לא נזרוק שגיאה כי השיתוף עצמו הצליח
                // ניתן להוסיף לוג כאן
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
                if (user == null)
                {
                    throw new Exception("The user was not found.");
                }

                share.UserId = user.Id;
                share.Permission = PermissionType.Read;
                share.CreatedAt = DateTime.Now;
                share.UpdatedAt = DateTime.Now;
                share.IsDeleted = false;

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