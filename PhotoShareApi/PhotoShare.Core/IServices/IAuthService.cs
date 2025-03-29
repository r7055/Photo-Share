using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;
using PhotoShare.Core.ViewModels;


namespace PhotoShare.Core.IServices
{
    public interface IAuthService 
    {
        Task<RegisterViewModel> RegisterAsync(UserDto userDto);
        Task<RegisterViewModel> LoginAsync(string usernameOrEmail, string password);
        string GenerateJwtToken(UserDto user, ICollection<Role> roles);
    }
}
