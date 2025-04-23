using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IDownloadService
    {
        public Task<string> GetDownloadUrlAsync(string fileName);

    }
}
