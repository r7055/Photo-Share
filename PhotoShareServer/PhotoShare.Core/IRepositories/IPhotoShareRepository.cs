﻿using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IRepositories
{
    public interface IPhotoShareRepository : IRepository<PhotoShare.Core.Models.PhotoShare>
    {
        Task<IEnumerable<PhotoShare.Core.Models.PhotoShare>> GetSharesByUserEmailAsync(int userId);
        Task<IEnumerable<PhotoShare.Core.Models.PhotoShare>> GetPhotoSharesByPhotoIdAsync(int photoId);
        Task<int> CountAsync(Expression<Func<PhotoShare.Core.Models.PhotoShare, bool>> expression);

        Task<int> CountAsync();
    }
}


