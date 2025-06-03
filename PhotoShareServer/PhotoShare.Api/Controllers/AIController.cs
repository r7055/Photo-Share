using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace PhotoShare.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Text.Json;
    using System.Text;
    using System.Web;

    namespace YourApp.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class ImageController : ControllerBase
        {
            private readonly HttpClient _httpClient;
            private readonly string _openAiApiKey;
            private readonly string _googleTranslateApiKey;

            public ImageController(HttpClient httpClient, IConfiguration configuration)
            {
                _httpClient = httpClient;
                _openAiApiKey = configuration["OpenAI:ApiKey"] ?? throw new ArgumentNullException("OpenAI API Key not configured");
                _googleTranslateApiKey = configuration["GoogleTranslate:ApiKey"] ?? throw new ArgumentNullException("Google Translate API Key not configured");
            }

            [HttpPost("generate")]
            public async Task<IActionResult> GenerateImage([FromBody] ImageRequest request)
            {
                try
                {
                    if (string.IsNullOrEmpty(request.Prompt))
                    {
                        return BadRequest(new { error = "Prompt is required" });
                    }

                    // Translate prompt to English (you'll need to implement translation service)
                    string promptEn = await TranslateToEnglish(request.Prompt);

                    // Prepare OpenAI API request
                    var dalleRequest = new
                    {
                        prompt = promptEn,
                        n = 1,
                        size = "512x512"
                    };

                    var json = JsonSerializer.Serialize(dalleRequest);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiApiKey}");

                    // Call OpenAI API
                    var response = await _httpClient.PostAsync("https://api.openai.com/v1/images/generations", content);
                    response.EnsureSuccessStatusCode();

                    var responseContent = await response.Content.ReadAsStringAsync();
                    var dalleResponse = JsonSerializer.Deserialize<DalleResponse>(responseContent);

                    if (dalleResponse?.Data?.FirstOrDefault()?.Url == null)
                    {
                        return StatusCode(500, new { error = "Failed to generate image" });
                    }

                    string imageUrl = dalleResponse.Data.First().Url;
                    Console.WriteLine($"Generated image URL: {imageUrl}");

                    // Download the image
                    var imageResponse = await _httpClient.GetAsync(imageUrl);
                    imageResponse.EnsureSuccessStatusCode();

                    var imageBytes = await imageResponse.Content.ReadAsByteArrayAsync();

                    // Optional: Save temporary file
                    string tempPath = Path.Combine(Path.GetTempPath(), $"temp_image_{Guid.NewGuid()}.png");
                    await System.IO.File.WriteAllBytesAsync(tempPath, imageBytes);

                    // Return image as response
                    return File(imageBytes, "image/png", "generated_image.png");
                }
                catch (HttpRequestException ex)
                {
                    return StatusCode(500, new { error = $"API request failed: {ex.Message}" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
                }
            }

            private async Task<string> TranslateToEnglish(string text)
            {
                try
                {
                    // Auto-detect language and translate to English
                    string url = $"https://translation.googleapis.com/language/translate/v2?key={_googleTranslateApiKey}";

                    var translateRequest = new
                    {
                        q = text,
                        target = "en",
                        format = "text"
                    };

                    var json = JsonSerializer.Serialize(translateRequest);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = await _httpClient.PostAsync(url, content);
                    response.EnsureSuccessStatusCode();

                    var responseContent = await response.Content.ReadAsStringAsync();
                    var translateResponse = JsonSerializer.Deserialize<GoogleTranslateResponse>(responseContent);

                    if (translateResponse?.Data?.Translations?.FirstOrDefault()?.TranslatedText != null)
                    {
                        return HttpUtility.HtmlDecode(translateResponse.Data.Translations.First().TranslatedText);
                    }

                    // If translation fails, return original text
                    return text;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Translation failed: {ex.Message}");
                    // If translation fails, return original text
                    return text;
                }
            }
        }

        // Request/Response models
        public class ImageRequest
        {
            public string Prompt { get; set; } = string.Empty;
        }

        public class DalleResponse
        {
            public List<DalleImageData>? Data { get; set; }
        }

        public class DalleImageData
        {
            public string? Url { get; set; }
        }

        // Google Translate response models
        public class GoogleTranslateResponse
        {
            public GoogleTranslateData? Data { get; set; }
        }

        public class GoogleTranslateData
        {
            public List<GoogleTranslation>? Translations { get; set; }
        }

        public class GoogleTranslation
        {
            public string? TranslatedText { get; set; }
            public string? DetectedSourceLanguage { get; set; }
        }
    }

}
