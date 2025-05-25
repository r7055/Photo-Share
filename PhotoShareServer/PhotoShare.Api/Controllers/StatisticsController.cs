using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoShare.Core.IServices;

namespace PhotoShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStatistics([FromQuery] int days)
        {
            if (days < 0)
            {
                return BadRequest("Number of days must be non-negative.");
            }

            try
            {
                var stats = await _statisticsService.GetStatisticsAsync(days);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("userActivity")]
        public async Task<IActionResult> GetUserActivity([FromQuery] int days)
        {
            if (days <= 0)
            {
                return BadRequest("Number of days must be positive.");
            }

            try
            {
                var userActivity = await _statisticsService.GetUserActivityDataAsync(days);
                return Ok(userActivity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("uploads")]
        public async Task<IActionResult> GetUploads([FromQuery] int days)
        {
            if (days <= 0)
            {
                return BadRequest("Number of days must be positive.");
            }

            try
            {
                var uploadsData = await _statisticsService.GetUploadsDataAsync(days);
                return Ok(uploadsData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("shares")]
        public async Task<IActionResult> GetShares([FromQuery] int days)
        {
            if (days <= 0)
            {
                return BadRequest("Number of days must be positive.");
            }

            try
            {
                var sharesData = await _statisticsService.GetSharesDataAsync(days);
                return Ok(sharesData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("storage")]
        public async Task<IActionResult> GetStorage()
        {
            try
            {
                var storageData = await _statisticsService.GetStorageDataAsync();
                return Ok(storageData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}