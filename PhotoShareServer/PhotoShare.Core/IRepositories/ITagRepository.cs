using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface ITagRepository : IRepository<Tag>
    {
        Task<ICollection<Tag>> GetUserTags(int userId);
        Task<Tag> GetTagIncludePhotoAsync(int id);
    }
}
