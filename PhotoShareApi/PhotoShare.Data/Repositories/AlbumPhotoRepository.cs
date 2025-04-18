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
    public class AlbumPhotoRepository:  Repository<AlbumPhoto>, IAlbumPhotoRepository
    {
        public AlbumPhotoRepository(PhotoShareContext context) : base(context)
        {
            
        }
    }
}
