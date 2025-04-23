using PhotoShare.Core.Models;


namespace PhotoShare.Core.IRepositories
{
    public interface IAuthRepository
    {
        Task<User> RegisterUser(User newUser);
        Task<bool> LoginUser(string email, string password);
    }
}
