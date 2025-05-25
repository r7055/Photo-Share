using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(PhotoShareContext context) : base(context)
        {

        }

        public async Task<ICollection<Tag>> GetUserTags(int userId)
        {
            return await _dbSet
                .Where(t => t.UserId == null || t.UserId == userId)
                .ToListAsync(); 
        }

        public async Task<Tag> GetTagIncludePhotoAsync(int id)
        {
            return await _dbSet.Include(t => t.Photos) 
                .FirstOrDefaultAsync(t => t.Id == id);
        }


    }

}
