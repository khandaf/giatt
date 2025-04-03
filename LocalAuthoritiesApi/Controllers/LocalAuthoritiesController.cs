using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class LocalAuthoritiesController : ControllerBase
{
    [HttpGet("boundaries")]
    public IActionResult GetLocalAuthorityBoundaries()
    {
        // Assuming your GeoJSON file is saved in a folder called "Data" in the project
        var geoJsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "local_authorities.geojson");

        if (!System.IO.File.Exists(geoJsonFilePath))
        {
            return NotFound();
        }

        var geoJson = System.IO.File.ReadAllText(geoJsonFilePath);
        return Content(geoJson, "application/json");
    }
}
