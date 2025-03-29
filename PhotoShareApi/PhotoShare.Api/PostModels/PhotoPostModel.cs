namespace PhotoShare.Api.PostModels
{
    public class PhotoPostModel
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public string Path { get; set; } = null!;
        public int AlbumId { get; set; }
        public string? Tags { get; set; }
    }
}
