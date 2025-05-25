using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IEmailService
    {
        Task<bool> SendAlbumShareEmailAsync(string recipientEmail, string albumTitle, string senderName, string message = null);
        Task<bool> SendEmailAsync(string to, string subject, string body);
    }
}
