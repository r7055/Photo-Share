using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using PhotoShare.Core.IServices;

namespace PhotoShare.Service.Services
{
    public class EmailService: IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendAlbumShareEmailAsync(string recipientEmail, string albumTitle, string senderName, string message = null)
        {
            try
            {
                var subject = $"📸 {senderName} shared an album with you: {albumTitle}";
                var body = GenerateAlbumShareEmailBody(albumTitle, senderName, message);

                return await SendEmailAsync(recipientEmail, subject, body);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var smtpHost = _configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
                var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "photoshare464@gmail.com";
                var fromPassword = _configuration["EmailSettings:FromPassword"] ?? "pfyo eufd hqzp ohyn";

                using var smtpClient = new SmtpClient(smtpHost)
                {
                    Port = smtpPort,
                    Credentials = new NetworkCredential(fromEmail, fromPassword),
                    EnableSsl = true,
                };

                using var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail, "PhotoShare"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(to);
                await smtpClient.SendMailAsync(mailMessage);
                return true;
            }
            catch (SmtpException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private string GenerateAlbumShareEmailBody(string albumTitle, string senderName, string personalMessage)
        {
            var message = !string.IsNullOrEmpty(personalMessage)
                ? $"<p style='font-style: italic; color: #666; margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px;'>\"{personalMessage}\"</p>"
                : "";

            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Album Shared - PhotoShare</title>
</head>
<body style='margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, ""Segoe UI"", Roboto, ""Helvetica Neue"", Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4;'>
    <div style='max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);'>
        
        <!-- Header with gradient -->
        <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;'>
            <div style='background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);'>
                <span style='font-size: 36px;'>📸</span>
            </div>
            <h1 style='color: white; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.3);'>PhotoShare</h1>
            <p style='color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;'>Someone shared an album with you!</p>
        </div>

        <!-- Content -->
        <div style='padding: 40px 30px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h2 style='color: #333; margin: 0 0 10px; font-size: 24px; font-weight: 600;'>
                    🎉 New Album Shared!
                </h2>
                <p style='color: #666; margin: 0; font-size: 16px;'>
                    <strong style='color: #667eea;'>{senderName}</strong> has shared the album 
                    <strong style='color: #333;'>""{albumTitle}""</strong> with you.
                </p>
            </div>

            {message}

            <div style='background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;'>
                <div style='font-size: 48px; margin-bottom: 15px;'>📷</div>
                <h3 style='margin: 0 0 10px; color: #333; font-size: 18px;'>Ready to explore?</h3>
                <p style='margin: 0; color: #666; font-size: 14px;'>Click the link below to view the shared photos</p>
            </div>

            <div style='text-align: center; margin: 35px 0;'>
                <a href='#' style='display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 35px; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;'>
                    🔗 View Album
                </a>
            </div>

            <div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px;'>
                <p style='margin: 0; font-size: 14px; color: #666; text-align: center;'>
                    💡 <strong>Tip:</strong> You can view, download, and enjoy all the photos in this album. 
                    Create your own PhotoShare account to start sharing your memories too!
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style='background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;'>
            <p style='margin: 0 0 15px; color: #666; font-size: 14px;'>
                This email was sent by PhotoShare - Your Photo Sharing Platform
            </p>
            <div style='margin: 15px 0;'>
                <span style='font-size: 20px; margin: 0 5px;'>📸</span>
                <span style='font-size: 20px; margin: 0 5px;'>💝</span>
                <span style='font-size: 20px; margin: 0 5px;'>🌟</span>
            </div>
            <p style='margin: 0; color: #999; font-size: 12px;'>
                © 2024 PhotoShare. Share your moments, create memories.
            </p>
        </div>
    </div>

    <!-- Mobile responsive styles -->
    <style>
        @media only screen and (max-width: 600px) {{
            .email-container {{ margin: 10px !important; }}
            .email-content {{ padding: 20px !important; }}
            .email-header {{ padding: 30px 20px !important; }}
            .email-footer {{ padding: 20px !important; }}
        }}
    </style>
</body>
</html>";
        }
    }
}

