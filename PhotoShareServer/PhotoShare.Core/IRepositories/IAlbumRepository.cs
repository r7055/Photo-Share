using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IAlbumRepository : IRepository<Album>
    {
        Task<int> CountAsync();
        Task<int> CountAsync(Expression<Func<Album, bool>> expression);
        Task<Album> GetAlbumIncludePhotosAsync(int albumId);
        Task<ICollection<Album>> GetAlbumsByParentAsync(int parentId, int userId );
        //Task<Album> GetByIdAsync(int id, int userId);
        Task<ICollection<Album>> GetRecycleAlbumsAsync(int userId);
        

    }
}
