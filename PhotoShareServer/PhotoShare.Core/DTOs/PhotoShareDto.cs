using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{

    public class PhotoShareDto
    {
        public int Id { get; set; }
        public int PhotoId { get; set; }
        public string UserEmailForSharing { get; set; }
        public int UserId { get; set; }
        public string Permission { get; set; }
    }
}
