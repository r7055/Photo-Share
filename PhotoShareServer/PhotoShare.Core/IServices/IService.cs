using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Core.IServices
{
    public interface IService<T>where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id,int userId);
        Task<T> CreateAsync(T val);
        Task<T> UpdateAsync(T val);
        Task<T> DeleteAsync(int id,int userId);

    }
}
