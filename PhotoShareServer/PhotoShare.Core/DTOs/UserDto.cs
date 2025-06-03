using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public int CountUpload { get; set; }
        public RoleDto? Role { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime LastLogin { get; set; }
        public bool status { get; set; }

    }
}
