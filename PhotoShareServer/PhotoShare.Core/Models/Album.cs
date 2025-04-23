using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using System.Text.Json.Serialization;

namespace PhotoShare.Core.Models;

public partial class Album : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int? ParentId { get; set; }

    public string Title { get; set; } = null!;

    public int OwnerId  { get;set;}

    public string? Description { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Album? Parent { get; set; }
    [JsonIgnore]
    public  ICollection<AlbumPhoto> AlbumPhotos { get; set; } = new List<AlbumPhoto>();
    [JsonIgnore]
    public  ICollection<AlbumShare> Users { get; set; } = new List<AlbumShare>();

}
