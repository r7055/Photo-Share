namespace PhotoShare.Api.PostModels
{
    public class PhotoSharePostModel
    {
        public int ImageId { get; set; }
        public string UserEmailForSharing { get; set; } = null!;
    }
}
