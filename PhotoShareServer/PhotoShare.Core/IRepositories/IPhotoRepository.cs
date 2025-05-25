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
    public interface IPhotoRepository : IRepository<Photo>
    {
        Task<int> CountAsync(Expression<Func<Photo, bool>> expression);
        Task<int> CountAsync();
        Task<IEnumerable<Photo>> GetPhotosByAlbumIdAndUserIdAsync(int albumId, int userId);
        Task<IEnumerable<Photo>> GetSharedPhotosByAlbumIdAndUserIdAsync(int albumId, int userId);
    }
}
