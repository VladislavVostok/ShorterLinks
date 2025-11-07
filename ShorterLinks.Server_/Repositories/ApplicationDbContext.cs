using Microsoft.EntityFrameworkCore;
using ShorterLinks.Server.Repositories.Models;


namespace ShorterLinks.Server.Repositories
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<ShortLink> ShortLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.UserName).IsUnique();

                entity.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(50);

                entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

                entity.Property(u => u.PasswordHash)
                .IsRequired();

            });

            modelBuilder.Entity<ShortLink>(entity =>
            {
                entity.HasKey(l => l.Id);
                entity.HasIndex(l => l.ShortCode).IsUnique();


                entity.Property(u => u.OriginalUrl)
                .IsRequired()
                .HasMaxLength(2000);

                entity.Property(u => u.ShortCode)
                .IsRequired()
                .HasMaxLength(10);

                entity.HasOne(l => l.User)
                .WithMany(u => u.ShortLinks)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}