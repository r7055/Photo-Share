using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoShare.Api.PostModels;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IServices;
using System.Security.Claims;

namespace PhotoShare.Api.Controllers
{
    [Route("api/albums")]
    [ApiController]
    public class AlbumShareController : ControllerBase
    {
        private readonly IShareService _shareService;
        private readonly IMapper _mapper;

        public AlbumShareController(IShareService shareService, IMapper mapper)
        {
            _shareService = shareService;
            _mapper = mapper;
        }

        [HttpGet("shared")]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetSharedAlbums()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var shares = await _shareService.GetAlbumSharesByUser(userId);
            return Ok(shares);
        }

        [HttpPost("share")]
        public async Task<ActionResult> ShareAlbum([FromBody] AlbumSharePostModel postModel)
        {
            if (postModel == null) return BadRequest("Invalid request data.");


            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            var shareDto = _mapper.Map<AlbumShareDto>(postModel);
            shareDto.UserId = userId;
            await _shareService.CreateAlbumShare(shareDto);

            return Ok(new { message = "Album shared successfully." });
        }
    }
}