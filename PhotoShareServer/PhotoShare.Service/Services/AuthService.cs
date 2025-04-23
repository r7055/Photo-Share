using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using PhotoShare.Core.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhotoShare.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration  configuration,IRepositoryManager repositoryManager, IMapper mapper)
        {
            _configuration = configuration;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        private async Task<bool> ValidateUser(string userEmail, string password)
        {
            var user = await _repositoryManager.User.GetByUserEmailAsync(userEmail);

            return user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }

        public async Task<RegisterViewModel> LoginAsync(string usernameOrEmail, string password)
        {
            if (await ValidateUser(usernameOrEmail, password))
            {
                var user = await _repositoryManager.User.GetByUserEmailAsync(usernameOrEmail);
                var resultDto = _mapper.Map<UserDto>(user);
                var token = GenerateJwtToken(resultDto, user.Roles);
                return new RegisterViewModel
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = token
                };
            }
            return null;
        }


        public async Task<RegisterViewModel> RegisterAsync(UserDto userDto)
        {
            var userByEmail = await _repositoryManager.User.GetByUserEmailAsync(userDto.Email);
            if (userByEmail != null)
                return null;

            var user = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Roles = new List<Role> { new Role { RoleName = "Editor",Description= "description" } }
            };

            var result = await _repositoryManager.User.AddAsync(user);
            if (result == null)
            {
                return null;
            }
            await _repositoryManager.SaveAsync();

            var resultDto = _mapper.Map<UserDto>(result);
            var token = GenerateJwtToken(resultDto,result.Roles);
            return new RegisterViewModel
            {
                User = resultDto,
                Token = token
            };
        }

        public string GenerateJwtToken(UserDto user, ICollection<Role> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
