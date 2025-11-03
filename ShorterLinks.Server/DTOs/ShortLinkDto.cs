namespace ShorterLinks.Server.DTOs
{
    public class ShortLinkDto
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortCode { get; set; }
        public string ShortUrl { get; set; }
        public int ClickCount {  get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastAccessed { get; set; }

    }
}
