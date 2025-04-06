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
    public class AlbumShareRepository : Repository<AlbumShare>, IAlbumShareRepository
    {
        public AlbumShareRepository(PhotoShareContext photoShareContext) : base(photoShareContext) { }

        public async Task<IEnumerable<AlbumShare>> GetAlbumSharesByUserIdAsync(int userId)
        {
            return await _dbSet.Include(albumShare=>albumShare.Album).Where(a => a.UserId == userId&&a.Permission==PermissionType.Read) .ToListAsync();
        }
    }

}
