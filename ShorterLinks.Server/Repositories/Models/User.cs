namespace ShorterLinks.Server.Repositories.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public List<ShortLink> ShortLinks { get; set; } = new();
    }
}
