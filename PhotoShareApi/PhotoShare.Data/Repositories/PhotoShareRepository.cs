﻿using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class PhotoShareRepository : Repository<PhotoShare.Core.Models.PhotoShare>, IPhotoShareRepository
    {
        public PhotoShareRepository(PhotoShareContext photoShareContext) : base(photoShareContext) { }

        public async Task<IEnumerable<PhotoShare.Core.Models.PhotoShare>> GetSharesByUserEmailAsync(int userId)
        {
            return await _dbSet.Where(p => p.UserId==userId&& p.Permission==PermissionType.Read).ToListAsync();
        }
    }
}
