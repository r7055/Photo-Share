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
    [Route("api/tags")]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;

        public TagController(ITagService tagService, IMapper mapper)
        {
            _tagService = tagService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] TagPostModel tagPostModel)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var tagDto = _mapper.Map<TagDto>(tagPostModel);
            if(tagPostModel.UserId!=0)
                tagDto.UserId = userId;
            var createdTag = await _tagService.CreateAsync(tagDto);
            return CreatedAtAction(nameof(GetTagById), new { id = createdTag.Id }, createdTag);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllAsync();
            return Ok(tags);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserTags()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }

            try
            {
                var userTags = await _tagService.GetUserTags(userId);
                return Ok(userTags); // Return the user tags if successful
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while retrieving user tags.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagById(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            var tag = await _tagService.GetByIdAsync(id, userId);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            await _tagService.DeleteAsync(id, userId);
            return NoContent();
        }
        [HttpGet("top")]
        public async Task<IActionResult> GetTopTags()
        {
            var tags = await _tagService.GetTopTagsAsync();
            return Ok(tags);
        }

    }
}
