using ShorterLinks.Server.DTOs;

namespace ShorterLinks.Server.Services
{
    public interface IAuthService
    {
        Task<AuthResultDto> Register(RegisterDto registerDto);
        Task<AuthResultDto> Login(LoginDto loginDto);
    }
}
