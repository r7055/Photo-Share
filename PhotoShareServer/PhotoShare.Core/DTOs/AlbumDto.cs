using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class AlbumDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public string? Description { get; set; }
        public int ParentId { get; set; }

    }
}
