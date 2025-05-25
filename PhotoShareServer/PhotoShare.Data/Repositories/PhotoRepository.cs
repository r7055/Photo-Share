using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class PhotoRepository : Repository<Photo>, IPhotoRepository
    {
        public PhotoRepository(PhotoShareContext context) : base(context)
        {

        }

        public async Task<int> CountAsync(Expression< Func<Photo, bool>> expression)
        {
            return await _dbSet.CountAsync(expression);
        }

        public Task<int> CountAsync()
        {
            return _dbSet.CountAsync();
        }

        public async Task<IEnumerable<Photo>> GetPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _dbSet
                .Include(p=>p.Tags)
                .Where(p => p.PhotoAlbums.Any(pa => pa.AlbumId == albumId && pa.IsDeleted == false) &&
                            p.OwnerId == userId && p.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<IEnumerable<Photo>> GetSharedPhotosByAlbumIdAndUserIdAsync(int albumId, int userId)
        {
            return await _dbSet
                .Include(p=>p.Tags)
                .Where(p => p.Users.Any(ps => ps.PhotoId == p.Id && ps.UserId == userId) &&
                            p.PhotoAlbums.Any(pa => pa.AlbumId == albumId && pa.IsDeleted == false) &&
                            p.IsDeleted == false)
                .ToListAsync();
        }

       
    }

}
