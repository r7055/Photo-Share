using PhotoShare.Core.DTOs;

namespace PhotoShare.Api.PostModels
{
    public class PhotoPostModel
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public string? Description { get; set; }
        public string Url { get; set; } = null!;
        public int AlbumId { get; set; }
        public List<TagDto>? Tags { get; set; }
    }
    public class UpdatePhotoPostModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int AlbumId { get; set; }
    }
}
