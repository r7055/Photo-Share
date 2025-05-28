using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService,IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdString, out int userId)||userId<1)
            {
                return BadRequest("User ID is not valid.");
            }
            var user = await _userService.GetByIdAsync(id,userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
             var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId)||userId<1)
            {
                return BadRequest("User ID is not valid.");
            }
            await _userService.DeleteAsync(id, userId);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdString, out int userId) || userId < 1)
            {
                return BadRequest("User ID is not valid.");
            }
            userDto.Id = userId;
            await _userService.UpdateAsync(userDto);
            return NoContent();
        }
        // מנהל
        [HttpPost]
        //[Authorize(Roles = "Admin")] 
        public async Task<IActionResult> AddUser([FromBody] UserDto userDto)
        {
            try
            {
                var user = await _userService.CreateAsync(userDto);

                if (user != null)
                {
                    return Ok(user); 
                }
                return BadRequest("Failed to create user."); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetTopUsers()
        {
            try
            {
                var topUsers = await _userService.GetTopUsersAsync();
                return Ok(topUsers);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while fetching top users.");
                return StatusCode(500, "Internal server error");
            }
        }

        //[HttpGet("statistics")]
        //public async Task<IActionResult> GetUserStatistics()
        //{
        //    var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (!int.TryParse(userIdString, out int userId) || userId < 1)
        //    {
        //        return BadRequest("User ID is not valid.");
        //    }

        //    // הנח שיש מתודה ב-IUserService שמחזירה סטטיסטיקות
        //    var statistics = await _userService.GetUserStatisticsAsync();
        //    return Ok(statistics);
        //}

    }
}
