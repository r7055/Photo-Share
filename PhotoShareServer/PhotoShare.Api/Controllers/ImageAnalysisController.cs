﻿//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Threading.Tasks;

//namespace PhotoShare.Api.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ImageAnalysisController : ControllerBase
//    {
//        private readonly IFileService _fileService;
//        private readonly IImageAnalysisService _aiService;

//        public ImageAnalysisController(IFileService fileService, IImageAnalysisService aiService)
//        {
//            _fileService = fileService;
//            _aiService = aiService;
//        }

//        [HttpPost("analyze-all-images")]
//        public async Task<IActionResult> AnalyzeAllImages()
//        {
//            var allFiles = await _fileService.GetAllFiles();
//            var results = new List<object>();

//            foreach (var file in allFiles)
//            {
//                try
//                {
//                    using var stream = await _fileService.DownloadFile(file.Id);
//                    if (stream == null) continue;

//                    using var ms = new MemoryStream();
//                    await stream.CopyToAsync(ms);
//                    var bytes = ms.ToArray();

//                    var analysis = await _aiService.AnalyzeImageAsync(bytes);

//                    file.Category = analysis.Category;
//                    file.IsBlurry = analysis.IsBlurry;
//                    file.PeopleCount = analysis.PeopleCount;
//                    file.IsOutdoor = analysis.IsOutdoor;
//                    file.EyesClosed = analysis.HasClosedEyes;
//                    file.AnalysisCompletedIs = true;

//                    await _fileService.UpdateFile(file);

//                    results.Add(new
//                    {
//                        FileId = file.Id,
//                        FileName = file.FileName,
//                        Analysis = analysis
//                    });
//                }
//                catch (Exception ex)
//                {
//                    results.Add(new
//                    {
//                        FileId = file.Id,
//                        FileName = file.FileName,
//                        Error = ex.Message
//                    });
//                }
//            }

//            return Ok(results);
//        }
//    }
//    public interface IFileService
//    {
//        Task<IEnumerable<File>> GetAllFiles();
//        Task<Stream> DownloadFile(int fileId);
//        Task UpdateFile(File file);
//    }

//    public interface IImageAnalysisService
//    {
//        Task<ImageAnalysisResult> AnalyzeImageAsync(byte[] imageBytes);
//    }

//    public class File
//    {
//        public int Id { get; set; }
//        public string FileName { get; set; }
//        public string Category { get; set; }
//        public bool IsBlurry { get; set; }
//        public int PeopleCount { get; set; }
//        public bool IsOutdoor { get; set; }
//        public bool EyesClosed { get; set; }
//        public bool AnalysisCompletedIs { get; set; }
//    }

//    public class ImageAnalysisResult
//    {
//        public string Category { get; set; }
//        public bool IsBlurry { get; set; }
//        public int PeopleCount { get; set; }
//        public bool IsOutdoor { get; set; }
//        public bool HasClosedEyes { get; set; }
//    }

//}


