namespace PhotoShare.Api.PostModels
{
    public class PhotoSharePostModel
    {
        public int PhotoId { get; set; }
        public string UserEmailForSharing { get; set; } = null!;
    }
}
