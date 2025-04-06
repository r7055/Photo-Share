using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IAlbumService: IService<AlbumDto>
    {
        Task<ICollection<Album>> GetAlbumsByParentAsync(int parentId,int userId);
        Task RestoreAlbumAsync(int id, int userId);

        Task<ICollection<AlbumDto>> GetRecycleAlbumsAsync(int userId);

    }
}
