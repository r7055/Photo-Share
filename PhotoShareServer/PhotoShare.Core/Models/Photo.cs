using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoShare.Core.Models;

public partial class Photo : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Name { get; set; }

    public double Size { get; set; }

    public int OwnerId { get; set; }

    public string Url { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int CountViews { get; set; }

    [JsonIgnore]
    public virtual ICollection<AlbumPhoto> PhotoAlbums { get; set; } = new List<AlbumPhoto>();
    [JsonIgnore]
    public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
    [JsonIgnore]
    public virtual ICollection<PhotoShare> Users { get; set; } = new List<PhotoShare>();

}
