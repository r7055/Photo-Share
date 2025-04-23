namespace PhotoShare.Api.PostModels
{
    public class AlbumPostModel
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; }
        public int ParentId { get; set; }
    }
}
