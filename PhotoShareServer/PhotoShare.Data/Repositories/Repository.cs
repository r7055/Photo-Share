using Microsoft.EntityFrameworkCore;
using PhotoShare.Core.IRepositories;
using PhotoShare.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace PhotoShare.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {

        protected readonly DbSet<T> _dbSet;

        public Repository(PhotoShareContext context)
        {
            _dbSet = context.Set<T>();
        }
        public async Task<T> AddAsync(T entity)
        {
           var res= await _dbSet.AddAsync(entity);
            return res.Entity;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var val =await GetByIdAsync(id);
            if (val != null)
            {
                _dbSet.Remove(val);
            }
            return val;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
                return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
          var entity = await _dbSet.FindAsync(id);
           return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            // נוודא שהישות קיימת בבסיס הנתונים
            //var existingEntity = await _dbSet.FindAsync(entity.Id);
            //if (existingEntity == null)
            //{
            //    throw new InvalidOperationException("Entity not found.");
            //}
            //// נעדכן את המצב של הישות ל-Modified
            //_dbContext.Entry(existingEntity).CurrentValues.SetValues(entity);
            //// נשמור את השינויים בבסיס הנתונים
            //await _dbContext.SaveChangesAsync();
            //// נחזיר את הישות המעודכנת
            //return existingEntity;
            var res = _dbSet.Update(entity);
            return res.Entity;
        }

        //public async Task<T?> UpdateAsync(T entity)
        //{
        //    var temp_entity = await GetByIdAsync(entity.Id);
        //    if (temp_entity == null)
        //        return entity;

        //    var idProperty = typeof(T).GetProperty("Id");
        //    if (idProperty != null && idProperty.CanWrite)
        //    {
        //        idProperty.SetValue(temp_entity, entity.Id);
        //    }


        //    var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
        //                                            .Where(property => property.Name != "Id" && property.Name != "Password");

        //    foreach (var property in properties)
        //    {
        //        var value = property.GetValue(entity);
        //        if (value != null)
        //        {
        //            property.SetValue(temp_entity, value);
        //        }
        //    }

        //    return temp_entity;
        //}

        public async Task DeleteRangeAsync(IEnumerable<int> ids)
        {
            var albumShares = await _dbSet.Where(val => ids.Contains(val.Id)).ToListAsync();
            _dbSet.RemoveRange(albumShares);
        }



    }
}
