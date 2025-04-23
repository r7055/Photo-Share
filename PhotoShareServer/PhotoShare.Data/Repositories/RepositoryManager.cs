using PhotoShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly PhotoShareContext _photoShareContext;

        public IAlbumRepository Album { get; }
        public IPhotoRepository Photo { get; }
        public IUserRepository User { get; }
        public ITagRepository Tag { get; }
        public IAuthRepository Auth { get; }
        public IAlbumPhotoRepository AlbumPhoto { get; }
        public IAlbumShareRepository AlbumShare { get; }
        public IPhotoShareRepository PhotoShare { get; }

        public RepositoryManager(PhotoShareContext photoShareContext, IAlbumRepository album, IPhotoRepository photo,
                                 IUserRepository user, ITagRepository tag, IAuthRepository auth,
                                 IPhotoShareRepository photoShareRepository, IAlbumShareRepository albumShareRepository,
                                 IAlbumPhotoRepository albumPhotoRepository)
        {
            _photoShareContext = photoShareContext;
            Album = album;
            Photo = photo;
            User = user;
            Tag = tag;
            Auth = auth;
            AlbumPhoto = albumPhotoRepository;
            AlbumShare = albumShareRepository;
            PhotoShare = photoShareRepository;
        }

        public async Task SaveAsync()
        {
            await _photoShareContext.SaveChangesAsync();
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _photoShareContext.Database.BeginTransactionAsync();
        }
    }
}
