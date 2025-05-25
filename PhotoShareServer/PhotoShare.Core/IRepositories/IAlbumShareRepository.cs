using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IAlbumShareRepository :IRepository<AlbumShare>
    {
        Task<int> CountAsync();
        Task<int> CountAsync(Expression<Func<AlbumShare, bool>> expression);

        Task<IEnumerable<AlbumShare>> GetAlbumSharesByUserIdAsync(int userId);

    }
}
