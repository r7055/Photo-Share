using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhotoShare.Core.Models
{
    public class AlbumShare : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("AlbumId")]

        public int AlbumId { get; set; }
        [JsonIgnore]
        public virtual Album? Album { get; set; }
        [ForeignKey("UserId")]

        public int UserId { get; set; }
        [JsonIgnore]
        public virtual User? User { get; set; }
        public PermissionType Permission { get; set; }

    }
}
