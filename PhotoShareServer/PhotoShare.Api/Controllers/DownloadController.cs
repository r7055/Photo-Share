using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PhotoShare.Core.IServices;

namespace PhotoShare.Api.Controllers
{
    [Route("api/download")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private readonly IDownloadService _downloadService;
        public DownloadController(IDownloadService downloadService)
        {
            _downloadService = downloadService;
        }

        [Authorize]
        [HttpGet("download-url/{fileName}")]
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var downloadUrl = await _downloadService.GetDownloadUrlAsync(fileName);
            return downloadUrl;
        }
    }
}
