using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<int> CountAsync();
        Task<int> CountAsync(Expression<Func<User, bool>> expression);
        Task<User> GetByUserEmailAsync(string username);
    }
}
