using Microsoft.EntityFrameworkCore;
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
    public class PhotoShareRepository : Repository<PhotoShare.Core.Models.PhotoShare>, IPhotoShareRepository
    {
        public PhotoShareRepository(PhotoShareContext photoShareContext) : base(photoShareContext) { }

        public async Task<IEnumerable<PhotoShare.Core.Models.PhotoShare>> GetSharesByUserEmailAsync(int userId)
        {
            return await _dbSet.Where(p => p.UserId == userId && p.Permission == PermissionType.Read).ToListAsync();
        }

        public async Task<IEnumerable<PhotoShare.Core.Models.PhotoShare>> GetPhotoSharesByPhotoIdAsync(int photoId)
        {
            return await _dbSet.Where(p => p.PhotoId == photoId).ToListAsync();
        }

        public async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        public async Task<int> CountAsync(Expression<Func<PhotoShare.Core.Models.PhotoShare, bool>> expression)
        {
            return await _dbSet.CountAsync(expression);
        }
    }
}
