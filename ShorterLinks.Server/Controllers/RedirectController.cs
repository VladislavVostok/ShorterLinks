
using Microsoft.AspNetCore.Mvc;
using ShorterLinks.Server.DTOs;
using ShorterLinks.Server.Services;

namespace ShorterLinks.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RedirectController : ControllerBase
    {
        private readonly ILinkService _linkService;
        public RedirectController(ILinkService linkService) {
            _linkService = linkService;
        }

        [HttpGet]
        public async Task<IActionResult> Redirect(string shortCode)
        {
            var originalUrl = await _linkService.GetOriginalUrlAsync(shortCode);
            if(string.IsNullOrEmpty(originalUrl)) return NotFound();

            await _linkService.IncrementClickCountAsync(shortCode);
            return await Redirect(originalUrl);
        }
    }
}
