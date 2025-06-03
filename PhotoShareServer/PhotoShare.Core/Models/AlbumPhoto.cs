using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.Models
{
    public class AlbumPhoto : IEntity
    {
        public int Id { get; set; }

        public int AlbumId { get; set; }

        public Album Album { get; set; } 

        public int PhotoId { get; set; }

        public Photo Photo { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
