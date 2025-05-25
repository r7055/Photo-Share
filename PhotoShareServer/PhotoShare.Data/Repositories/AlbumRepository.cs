using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System.Linq.Expressions;

namespace PhotoShare.Data.Repositories
{
    public class AlbumRepository : Repository<Album>, IAlbumRepository
    {
        public AlbumRepository(PhotoShareContext context) : base(context)
        {
        }
        public async Task<Album> GetAlbumIncludePhotosAsync(int albumId)
        {
            return await _dbSet.Include(a => a.AlbumPhotos)
                .ThenInclude(ap => ap.Photo)
                .Where(a => a.Id == albumId)
                .FirstOrDefaultAsync();
        }

        public async Task<ICollection<Album>> GetAlbumsByParentAsync(int parentId, int userId)
        {
            if (parentId == 0)
            {
                return await _dbSet
              .Include(a => a.Users)
              .Where(a => a.ParentId == null && a.IsDeleted == false &&
              a.Users.Any(u => u.UserId == userId && u.Permission == PermissionType.Owner))
              .ToListAsync();
            }
            return await _dbSet
                .Include(a => a.Users)
                .Where(a => a.ParentId == parentId && a.IsDeleted == false &&
                a.Users.Any(u => u.UserId == userId && u.Permission == PermissionType.Owner))
                .ToListAsync();
        }

        public async Task<ICollection<Album>> GetRecycleAlbumsAsync(int userId)
        {
            return await _dbSet.Where(a =>a.OwnerId==userId && a.IsDeleted == true).ToListAsync();
        }


        public async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        public async Task<int> CountAsync(Expression<Func<Album, bool>> expression)
        {
            return await _dbSet.CountAsync(expression);
        }
        //public async Task<Album> GetByIdAsync(int id, int userId)
        //{
        //    return await _dbSet.Include(a => a.Users)
        //        .Where(a => a.Id == id && a.Users.Any(albumShare => albumShare.UserId == userId))
        //        .FirstOrDefaultAsync();
        //}
    }

}
