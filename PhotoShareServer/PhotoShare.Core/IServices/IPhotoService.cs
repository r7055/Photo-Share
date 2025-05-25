using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IPhotoService : IService<PhotoDto>
    {
        Task<IEnumerable<PhotoDto>> GetPhotosByAlbumId(int albumId);
        Task DeletePhotoAsync(int id, int albumId, int userId);
        Task<IEnumerable<Photo>> GetPhotosByAlbumIdAndUserIdAsync(int albumId, int userId);
        Task<IEnumerable<Photo>> GetSharedPhotosByAlbumIdAndUserIdAsync(int albumId, int userId);
        Task<IEnumerable<PhotoDto>> GetRecyclePhotosAsync(int userId);
        Task RestorePhotoAsync(int photoId, int albumId, int userId);

        Task<IEnumerable<PhotoDto>> GetTopPhotoAsync();


        //Task<PhotoDto> CopyAsync(int photoId, int targetAlbumId);
        //Task<PhotoDto> CutAsync(int photoId, int targetAlbumId);
        //Task<PhotoDto> PasteAsync(PhotoDto photoDto);
    }
}
