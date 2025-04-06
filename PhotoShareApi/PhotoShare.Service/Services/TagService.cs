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
            try
            {
                var tag = _mapper.Map<Tag>(tagDto);
                tag.UpdatedAt = DateTime.Now;
                tag.CreatedAt = DateTime.Now;
                var res = await _repositoryManager.Tag.AddAsync(tag);
                await _repositoryManager.SaveAsync(); 
                return _mapper.Map<TagDto>(res);
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework)
                // throw a custom exception or handle it as needed
                throw new ApplicationException("An error occurred while creating the tag.", ex);
            }
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

        public async Task<ICollection<TagDto>> GetUserTags(int userId)
        {
            try
            {
                var tags = await _repositoryManager.Tag.GetUserTags(userId);

                if (tags == null || !tags.Any())
                {
                    return new List<TagDto>(); 
                }

                return _mapper.Map<ICollection<TagDto>>(tags);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "An error occurred while retrieving user tags.");
                throw new Exception("An error occurred while processing your request.", ex);
            }
        }

    }
}
