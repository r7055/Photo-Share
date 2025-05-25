using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class AlbumPhotoRepository : Repository<AlbumPhoto>, IAlbumPhotoRepository
    {
        public AlbumPhotoRepository(PhotoShareContext context) : base(context)
        {
        }

        public async Task<AlbumPhoto> GetAlbumPhotoByAlbumIdAndPhotoId(int albumId, int photoId)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.AlbumId == (albumId==0?null:albumId) && x.PhotoId == photoId);
        }

        public async Task<IEnumerable<AlbumPhoto>> GetAlbumPhotosByPhotoId(int photoId)
        {
            return await _dbSet
                .Where(ap => ap.PhotoId == photoId)
                .ToListAsync();
        }
        public async Task<IEnumerable<AlbumPhoto>> GetRecyclePhotosAsync(int userId)
        {
            return await _dbSet
                .Include(ap => ap.Photo)
                .Where(ap => ap.Photo.OwnerId == userId && ap.IsDeleted == true)
                .ToListAsync();
        }
    }
}
