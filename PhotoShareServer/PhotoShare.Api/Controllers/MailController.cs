using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace PhotoShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
        public class MailController : ControllerBase
        {
            [HttpPost]
            [Route("api/send-email")]
            public IActionResult SendEmail([FromBody] EmailRequest request)
            {
                try
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential("photoshare464@gmail.com", "pfyo eufd hqzp ohyn"),
                        EnableSsl = true,
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("photoshare464@gmail.com"),
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
