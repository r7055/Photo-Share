using Amazon.S3;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoShare.Api.PostModels;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IServices;
using PhotoShare.Service.Services;
using System.Security.Claims;

namespace PhotoShare.Api.Controllers
{
    [ApiController]
    [Route("api/photos")]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IDownloadService _downloadService;
        private readonly IMapper _mapper;

        public PhotoController(IPhotoService photoService,IMapper mapper, IDownloadService downloadService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _downloadService = downloadService;
        }
        [HttpGet]
        public async Task<IActionResult> getAllPhotos()
        {
            try
            {
                var photos = await _photoService.GetAllAsync();
                foreach (var photo in photos)
                {
                    photo.Url = await _downloadService.GetDownloadUrlAsync(photo.Name);
                }
                return Ok(photos); // מחזיר את התמונות עם קוד סטטוס 200
            }
            catch (Exception ex)
            {
                // אם יש שגיאה, מחזירים קוד שגיאה 500 עם הודעת השגיאה
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetPhotosByAlbumId(int albumId)
        {
            try
            {
                var photos = await _photoService.GetPhotosByAlbumId(albumId);
                //foreach (var photo in photos)
                //{
                //   photo.Url=await _downloadService.GetDownloadUrlAsync(photo.Name);
                //}
                return Ok(photos);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("photo/{id}")]
        public async Task<IActionResult> GetPhotoById(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var photo = await _photoService.GetByIdAsync(id, userId);
            if (photo == null)
            {
                return NotFound();
            }
            photo.Url=await _downloadService.GetDownloadUrlAsync(photo.Name);   
            return Ok(photo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id, [FromBody] int albumId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            await _photoService.DeletePhotoAsync(id,albumId, userId);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto(PhotoPostModel photoPostModel)
        {

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var photoDto=_mapper.Map<PhotoDto>(photoPostModel);
            photoDto.UserId = userId;
            try
            {
               var res= await _photoService.CreateAsync(photoDto);
                return res!=null ? Ok(res) : BadRequest(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);///change
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhoto(int id, [FromBody] UpdatePhotoPostModel updatePhoto)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            var photoDto = _mapper.Map<PhotoDto>(updatePhoto);
            photoDto.UserId = userId;
            photoDto.Id = id;  

            try
            {
                var res = await _photoService.UpdateAsync(photoDto);
                return res != null ? Ok(res) : BadRequest("Update failed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        //[HttpGet("album/{albumId}/user")]
        //public async Task<IActionResult> GetPhotosByAlbumIdAndUserId(int albumId)
        //{
        //    var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (!int.TryParse(userIdString, out int userId) || userId < 1)
        //    {
        //        return BadRequest("User ID is not valid.");
        //    }
        //    var photos = await _photoService.GetPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        //    return Ok(photos);
        //}

        //[HttpGet("shared/album/{albumId}/user")]
        //public async Task<IActionResult> GetSharedPhotosByAlbumIdAndUserId(int albumId)
        //{
        //    var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (!int.TryParse(userIdString, out int userId) || userId < 1)
        //    {
        //        return BadRequest("User ID is not valid.");
        //    }
        //    var sharedPhotos = await _photoService.GetSharedPhotosByAlbumIdAndUserIdAsync(albumId, userId);
        //    return Ok(sharedPhotos);
        //}

        [HttpGet("recycle")]
        public async Task<IActionResult> GetRecyclePhotos()
        {
            
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                var photos = await _photoService.GetRecyclePhotosAsync(userId);
                foreach (var photo in photos)
                {
                    photo.Url = await _downloadService.GetDownloadUrlAsync(photo.Name);
                }
                return Ok(photos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving recycle photos.");
            }
        }


        [HttpPost("restore")]
        public async Task<IActionResult> RestorePhoto([FromBody] int photoId, [FromQuery] int albumId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                await _photoService.RestorePhotoAsync(photoId, albumId, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> GetTopPhotos()
        {
            try
            {
                var topPhotos = await _photoService.GetTopPhotoAsync();

                if (topPhotos == null || !topPhotos.Any())
                {
                    return NotFound(); 
                }

                return Ok(topPhotos); 
            }
            catch (Exception ex)
            {
                // Log the exception (logging mechanism can be added here)
                return StatusCode(500, "Internal server error: " + ex.Message);  
            }
        }
        [HttpGet("upload-statistics")]
        public async Task<IActionResult> GetUploadStatistics()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            //var statistics = await _photoService.GetUploadStatisticsAsync();
            //return Ok(statistics);
            return NoContent();
        }

        //[HttpPost("copy")]
        //public async Task<IActionResult> CopyPhoto(int photoId, int targetAlbumId)
        //{
        //    var result = await _photoService.CopyAsync(photoId, targetAlbumId);
        //    return Ok(result);
        //}
    }

}
