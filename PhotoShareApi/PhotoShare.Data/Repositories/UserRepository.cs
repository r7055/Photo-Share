using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class UserRepository : Repository<User> ,IUserRepository
    {
        public UserRepository(PhotoShareContext context) : base(context)
        {
        }

        public async Task<User> GetByUserEmailAsync(string userEmail)
        {
           return await _dbSet.FirstOrDefaultAsync(x => x.Email == userEmail);
        }
    }

}
