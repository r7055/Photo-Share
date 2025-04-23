using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhotoShare.Core.Models
{
    public class PhotoShare : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        [ForeignKey("PhotoId")]
        public int PhotoId { get; set; }
        [JsonIgnore]
        public Photo? Photo { get; set; }
        public PermissionType Permission { get; set; }

    }
}
