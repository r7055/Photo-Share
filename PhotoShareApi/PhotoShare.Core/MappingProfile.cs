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
                     .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password)); // כאן תוכל לקרוא לפונקציה שמבצעת את הה hashing
            CreateMap<Album, AlbumDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<Tag, TagDto>().ReverseMap();
            //CreateMap<ICollection<Tag>, ICollection<TagDto>>();
            CreateMap<AlbumShare, AlbumShareDto>().ReverseMap();
            CreateMap<PhotoShare.Core.Models.PhotoShare, PhotoShareDto>().ReverseMap();
            CreateMap<ICollection<AlbumDto>, ICollection<Album>>();
        }
    }
}
