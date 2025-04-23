using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class AlbumShareDto
    {
        public int Id { get; set; }
        public int AlbumId { get; set; } 
        public string UserEmailForSharing { get; set; }
        public int UserId { get; set; }
        public PermissionType Permission { get; set; }
    }
}
