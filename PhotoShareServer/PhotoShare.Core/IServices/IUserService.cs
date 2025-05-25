using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IUserService : IService<UserDto>
    {
        Task<StatisticsDto> GetUserStatisticsAsync();
        Task AddUploadToUser(int userId);
        Task<IEnumerable<UserDto>> GetTopUsersAsync();


    }
}
