using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
        public double Size { get; set; }
        public string Name { get; set; }
        public int AlbumId { get; set; }
        public List<TagDto> Tags { get; set; }
    }
}
