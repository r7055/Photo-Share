using AutoMapper;
using PhotoShare.Core.DTOs;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.IServices;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Service.Services
{
    public class TagService : ITagService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TagService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TagDto>> GetAllAsync()
        {
            var tags = await _repositoryManager.Tag.GetAllAsync();
            return _mapper.Map<IEnumerable<TagDto>>(tags);
        }

        public async Task<TagDto> GetByIdAsync(int id, int userId)
        {
            var tag = await _repositoryManager.Tag.GetByIdAsync(id);
            //check if the tag.userId is the owner of the tag
            //or he have the permission to get the tag
            return _mapper.Map<TagDto>(tag);
        }

        public async Task<TagDto> CreateAsync(TagDto tagDto)
        {
            var tag = _mapper.Map<Tag>(tagDto);
            var res = await _repositoryManager.Tag.AddAsync(tag);
            return _mapper.Map<TagDto>(res);
        }

        public async Task<TagDto> UpdateAsync(TagDto tagDto)
        {
            var prevTag = await _repositoryManager.Tag.GetByIdAsync(tagDto.Id);
            if (prevTag == null)
            {
                throw new Exception("Tag not found");
            }
            //check if the tag.userId is the owner of the tag
            //or he have the permission to update the tag
            var tag = _mapper.Map<Tag>(tagDto);
            var updateTag = await _repositoryManager.Tag.UpdateAsync(tag);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<TagDto>(updateTag);
        }

        public async Task DeleteAsync(int id, int userId)
        {
            var tag = await _repositoryManager.Tag.GetByIdAsync(id);
            //check if the tag.userId is the owner of the tag
            //or he have the permission to delete the tag
            await _repositoryManager.Tag.DeleteAsync(id);
        }
    }
}
