using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IAlbumPhotoRepository : IRepository<AlbumPhoto>
    {
        Task<AlbumPhoto> GetAlbumPhotoByAlbumIdAndPhotoId(int albumId, int photoId);
        Task<IEnumerable<AlbumPhoto>> GetAlbumPhotosByPhotoId(int photoId);
        Task<IEnumerable<AlbumPhoto>> GetRecyclePhotosAsync(int userId);
    }
}

//public class AlbumPhotoRepository : RepositoryBase<AlbumPhoto>, IAlbumPhotoRepository
//{
//    public AlbumPhotoRepository(DbContext context) : base(context)
//    {
//    }

//    public async Task<AlbumPhoto> GetAlbumPhotoByAlbumIdAndPhotoId(int albumId, int photoId)
//    {
//        return await _context.Set<AlbumPhoto>()
//            .FirstOrDefaultAsync(ap => ap.AlbumId == albumId && ap.PhotoId == photoId);
//    }

//    public async Task<IEnumerable<AlbumPhoto>> GetAlbumPhotosByPhotoId(int photoId) // Implement the missing method  
//    {
//        return await _context.Set<AlbumPhoto>()
//            .Where(ap => ap.PhotoId == photoId)
//            .ToListAsync();
//    }
//}

