using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;

namespace PhotoShare.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));
            CreateMap<Album, AlbumDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();
            CreateMap<AlbumShare, AlbumShareDto>().ReverseMap();
            CreateMap<PhotoShare.Core.Models.PhotoShare, PhotoShareDto>().ReverseMap();
            CreateMap<ICollection<AlbumDto>, ICollection<Album>>();

            // הוספת מפה בין AlbumPhoto ל-PhotoDto
            CreateMap<AlbumPhoto, PhotoDto>()
                .ForMember(dest => dest.AlbumId, opt => opt.MapFrom(src => src.AlbumId))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.PhotoId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Photo.OwnerId))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Photo.Url))
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.Photo.Size))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Photo.Name))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Photo.Tags.Select(tag => new TagDto { /* העברת פרטי התג כאן */ })));
        }
    }
}
