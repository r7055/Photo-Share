using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByUserEmailAsync(string username);
    }
}
