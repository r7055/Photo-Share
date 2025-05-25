namespace PhotoShare.Api.PostModels
{
    public class AlbumSharePostModel
    {
        public int AlbumId { get; set; }
        public string UserEmailForSharing { get; set; } = null!;
        public string Message { get; set; } = string.Empty;
    }
}
