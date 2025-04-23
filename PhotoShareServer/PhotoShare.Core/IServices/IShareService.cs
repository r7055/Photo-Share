using PhotoShare.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IShareService
    {
        Task<IEnumerable<AlbumDto>> GetAlbumSharesByUser(int userId);
        Task<IEnumerable<PhotoDto>> GetImageSharesByUser(int userId);
        Task CreateAlbumShare(AlbumShareDto albumShareDto);
        Task CreateImageShare(PhotoShareDto imageShareDto);
    }
}
