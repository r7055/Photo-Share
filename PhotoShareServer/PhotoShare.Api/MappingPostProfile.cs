﻿using AutoMapper;
using PhotoShare.Api.PostModels;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.Models;

namespace PhotoShare.Api
{
    public class MappingPostProfile : Profile
    {
        public MappingPostProfile()
        {
            CreateMap<PhotoPostModel, PhotoDto>();
            CreateMap<AlbumPostModel, AlbumDto>();
            CreateMap<TagPostModel, TagDto>();
            CreateMap<UserRegisterPostModel, UserDto>();
            CreateMap<UserLoginPostModel, UserDto>();
            //CreateMap<AlbumSharePostModel, AlbumShareDto>();
            CreateMap<PhotoSharePostModel, PhotoShareDto>();
            CreateMap<UpdatePhotoPostModel, PhotoDto>();
            CreateMap<AlbumSharePostModel, AlbumShareDto>()
               .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message ?? string.Empty))
               .ForMember(dest => dest.UserId, opt => opt.Ignore());
        }
    }
}
