using PhotoShare.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.ViewModels
{
   public class RegisterViewModel
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}
