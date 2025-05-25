using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.DTOs
{
    public class SharesDataDto
    {
        public int[] SharesAlbums { get; set; }
        public int[] SharesPhotos { get; set; }
    }

    public class StorageDataDto
    {
        public double StorageUsedPercent { get; set; }
    }
    public class StatisticsDto
    {
        public int TotalUsers { get; set; }
        public int NewUsers { get; set; }
        public int TotalPhotos { get; set; }
        public int NewPhotos { get; set; }
        public int TotalAlbums { get; set; }
        public int NewAlbums { get; set; }
        public int TotalShares { get; set; }
        public double StorageUsed { get; set; }
    }

}
