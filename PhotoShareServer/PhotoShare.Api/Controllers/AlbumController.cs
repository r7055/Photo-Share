using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoShare.Api.PostModels;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IServices;
using System.Security.Claims;

namespace PhotoShare.Api.Controllers
{
    [ApiController]
    [Route("api/albums")]
    //[Authorize]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly IMapper _mapper;

        public AlbumController(IAlbumService albumService, IMapper mapper)
        {
            _albumService = albumService;
            _mapper = mapper;
        }

        [HttpGet]
        //angulr only admin
        public async Task<IActionResult> GetAllAlbums()
        {
            try
            {
                var albums = await _albumService.GetAllAsync();

                return Ok(albums);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error retrieving all albums.");
                return StatusCode(500, "An error occurred while retrieving the albums.");
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateAlbum([FromBody] AlbumPostModel albumPostModel)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            var albumDto = _mapper.Map<AlbumDto>(albumPostModel);
            albumDto.UserId = userId;

            try
            {
                var createdAlbum = await _albumService.CreateAsync(albumDto);

                return createdAlbum != null ? Ok(createdAlbum) : StatusCode(500, "An error occurred while creating the album.");
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error creating album for user ID {UserId}", userId);
                return StatusCode(500, "An error occurred while creating the album.");
            }
        }



        [HttpGet("parent/{id}")]
        public async Task<IActionResult> GetAlbumsByParentAsync(int id)
        {
            try
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdString, out int userId) || userId < 1)
                {
                    return BadRequest("User ID is not valid.");
                }

                var albums = await _albumService.GetAlbumsByParentAsync(id, userId);
                return Ok(albums);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest("Parent ID cannot be null: " + ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound("No albums found for the given parent ID: " + ex.Message);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Database update error: " + ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }





        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumById(int id)
        {
            if (id < 1)
            {
                return BadRequest("Album ID is not valid");
            }

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                var album = await _albumService.GetByIdAsync(id, userId);

                if (album == null)
                {
                    return NotFound(); 
                }

                return Ok(album);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error retrieving album with ID {Id}", id);
                return StatusCode(500, "An error occurred while retrieving the album."); 
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            if (id < 1)
            {
                return BadRequest("Album ID is not valid.");
            }

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                await _albumService.DeleteAsync(id, userId);
                return NoContent(); 
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error deleting album with ID {Id}", id);
                return StatusCode(500, "An error occurred while deleting the album."); 
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditAlbum([FromBody] AlbumPostModel albumPostModel, int id)
        {
            if (id < 1)
                return BadRequest("Album ID is not valid");

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                var albumDto = _mapper.Map<AlbumDto>(albumPostModel);
                albumDto.UserId = userId;
                albumDto.Id = id;

                var updateAlbum = await _albumService.UpdateAsync(albumDto);

                return updateAlbum != null ? Ok(updateAlbum) : StatusCode(500, "The update was unsuccessful.");
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error updating album with ID {Id}", id);
                return StatusCode(500, "An error occurred while updating the album.");
            }
        }


        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreAlbum(int id)
        {
            if (id < 1)
                return BadRequest("Album ID is not valid");

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                await _albumService.RestoreAlbumAsync(id, userId);
                return Ok("Album restored successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound("Album not found: " + ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid("You do not have permission to restore this album: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error restoring album with ID {Id}", id);
                return StatusCode(500, "An error occurred while restoring the album.");
            }
        }


        [HttpGet("recycle")]
        public async Task<IActionResult> GetRecycleAlbums()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                var albums = await _albumService.GetRecycleAlbumsAsync(userId);
                return Ok(albums);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving recycle albums.");
            }
        }

    }
}
