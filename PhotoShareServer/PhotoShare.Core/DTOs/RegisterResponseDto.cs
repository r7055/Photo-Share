using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class RegisterResponseDto
    {
        public int UserId { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}
