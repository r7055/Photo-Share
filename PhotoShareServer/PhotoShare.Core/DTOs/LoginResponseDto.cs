using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string[] Roles { get; set; }
    }
}
