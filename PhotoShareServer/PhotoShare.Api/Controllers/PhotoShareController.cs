using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoShare.Api.PostModels;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IServices;
using System.Security.Claims;

namespace PhotoShare.Api.Controllers
{
    [Route("api/photos")]
    [ApiController]
    public class PhotoShareController : ControllerBase
    {
        private readonly IShareService _shareService;
        private readonly IMapper _mapper;

        public PhotoShareController(IShareService shareService, IMapper mapper)
        {
            _shareService = shareService;
            _mapper = mapper;
        }

        [HttpGet("shared")]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> GetSharedPhotos(int userId)
        {
            var shares = await _shareService.GetImageSharesByUser(userId);
            return Ok(shares);
        }

        [HttpPost("share")]
        public async Task<ActionResult> SharePhoto([FromBody] PhotoSharePostModel postModel)
        {
            if (postModel == null) return BadRequest("Invalid request data.");

            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            var shareDto = _mapper.Map<PhotoShareDto>(postModel);
            shareDto.UserId = userId;
            await _shareService.CreateImageShare(shareDto);

            return Ok(new { message = "Image shared successfully." });
        }

        //[HttpGet("statistics")]
        //public async Task<IActionResult> GetPhotoShareStatistics()
        //{
        //    var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (!int.TryParse(userIdString, out int userId) || userId < 1)
        //    {
        //        return BadRequest("User ID is not valid.");
        //    }

        //    var statistics = await _shareService.GetPhotoShareStatisticsAsync();
        //    return Ok(statistics);
        //}

    }
}
