using ShorterLinks.Server.DTOs;


namespace ShorterLinks.Server.Services
{
    public interface ILinkService
    {
        Task<List<ShortLinkDto>> GetUserLinksAsync(int userId);
        Task<ShortLinkDto> CreateLinkAsync(int userId, string originalUrl);
        Task DeleteLinkAsync(int userId, int linkId);
        Task<string> GetOriginalUrlAsync(string shortCode);
        Task IncrementClickCountAsync(string shortCode);
        Task<LinkStatsDto> GetLinkStatsAsync(int userId, int linkId);
    }
}
