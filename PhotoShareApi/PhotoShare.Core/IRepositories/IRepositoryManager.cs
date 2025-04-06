using Microsoft.EntityFrameworkCore.Storage;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IRepositoryManager
    {
        IAlbumRepository Album { get; }
        IPhotoRepository Photo { get; }
        IUserRepository User { get; }
        ITagRepository Tag { get; }
        IAuthRepository Auth { get; }
        IAlbumPhotoRepository AlbumPhoto { get; }
        IAlbumShareRepository AlbumShare { get; }
        IPhotoShareRepository PhotoShare { get; }
        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}
