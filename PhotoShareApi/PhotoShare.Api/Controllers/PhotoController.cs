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
        private readonly IMapper _mapper;

        public PhotoController(IPhotoService photoService,IMapper mapper)
        {
            _photoService = photoService;
            _mapper = mapper;
        }


        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetPhotosByAlbumId(int albumId)
        {
            try
            {
                var photos = await _photoService.GetPhotosByAlbumId(albumId);
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
            return Ok(photo);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            await _photoService.DeleteAsync(id, userId);
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

        [HttpGet("album/{albumId}/user")]
        public async Task<IActionResult> GetPhotosByAlbumIdAndUserId(int albumId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var photos = await _photoService.GetPhotosByAlbumIdAndUserIdAsync(albumId, userId);
            return Ok(photos);
        }

        [HttpGet("shared/album/{albumId}/user")]
        public async Task<IActionResult> GetSharedPhotosByAlbumIdAndUserId(int albumId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var sharedPhotos = await _photoService.GetSharedPhotosByAlbumIdAndUserIdAsync(albumId, userId);
            return Ok(sharedPhotos);
        }
    }

}
