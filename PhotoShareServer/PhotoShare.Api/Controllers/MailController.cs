using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace PhotoShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("send-email")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["EmailSettings:SmtpHost"])
                {
                    Port = int.Parse(_configuration["EmailSettings:SmtpPort"]),
                    Credentials = new NetworkCredential(
                        _configuration["EmailSettings:FromEmail"],
                        _configuration["EmailSettings:FromPassword"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["EmailSettings:FromEmail"]),
                    Subject = request.Subject,
                    Body = request.Body,
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(request.To);

                smtpClient.Send(mailMessage);
                return Ok("Email sent successfully");
            }
            catch (SmtpException smtpEx)
            {
                return BadRequest($"SMTP error: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
    }

    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
