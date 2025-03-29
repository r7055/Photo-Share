using System.Security.Claims;
using Microsoft.AspNetCore.Http;

public class TokenHelper
{
    public static int? GetUserIdFromToken(HttpContext httpContext)
    {
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        {
            return userId;
        }
        return null; 
    }

}
