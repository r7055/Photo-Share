using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.Models;

public class PhotoShareContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Role> Roles { get; set; }
    //public DbSet<PhotoTag> PhotoTag { get; set; }
    public DbSet<AlbumPhoto> AlbumPhoto { get; set; }
    public DbSet<AlbumShare> AlbumShare { get; set; }
    public DbSet<PhotoShare.Core.Models.PhotoShare> PhotoShare { get; set; }
    public PhotoShareContext(DbContextOptions<PhotoShareContext> options)
           : base(options) { }
}

