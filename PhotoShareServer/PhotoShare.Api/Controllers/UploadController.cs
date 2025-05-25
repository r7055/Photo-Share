using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using PhotoShare.Core.IServices;
using System.Security.Claims;

namespace PhotoShare.Api.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IUserService _userService;

        public UploadController(IAmazonS3 s3Client,IUserService userService)
        {
            _s3Client = s3Client;
            _userService = userService;
        }

        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = "photo-share-application",
        //        Key = fileName,
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.UtcNow.AddMinutes(5),
        //        ContentType = "image/jpeg" 
        //    };

        //    string url = _s3Client.GetPreSignedURL(request);

        //    return Ok(new { url });
        //}
        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string fileType)
        {
            string contentType = fileType.ToLower() switch
            {
            "image/jpeg" => "image/jpeg",
            "jpeg" => "image/jpeg",
            "jpg" => "image/jpeg",
            "image/png" => "image/png",
            "png" => "image/png",
            "image/gif" => "image/gif", 
            "gif" => "image/gif",      
            "image/webp" => "image/webp", 
            "webp" => "image/webp",      
                _ => "application/octet-stream" // ברירת מחדל לסוגים שאינם מזוהים
            };

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "photo-share-application",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = contentType
            };

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            await _userService.AddUploadToUser(userId);
            string url = _s3Client.GetPreSignedURL(request);

            return Ok(new { url });
        }

    }
}
