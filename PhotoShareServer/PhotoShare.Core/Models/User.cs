using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhotoShare.Core.Models;

public partial class User : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Role> Roles { get; set; }=new List<Role>();

    public virtual ICollection<AlbumShare> Albums { get; set; } = new List<AlbumShare>();

    public virtual ICollection<PhotoShare> Photos { get; set; } = new List<PhotoShare>();

}
