using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;


namespace LocalAuthoritiesApi.Tests
{
    public class LocalAuthoritiesControllerTests
    {
        private readonly LocalAuthoritiesController _controller;
        private readonly Mock<ILogger<LocalAuthoritiesController>> _mockLogger;

        public LocalAuthoritiesControllerTests()
        {
            _mockLogger = new Mock<ILogger<LocalAuthoritiesController>>();
            _controller = new LocalAuthoritiesController();
        }

        [Fact]
        public void GetLocalAuthorityBoundaries_ReturnsGeoJsonContent()
        {
            // Arrange
            var geoJsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "local_authorities.geojson");
            File.WriteAllText(geoJsonFilePath, "{\"type\":\"FeatureCollection\", \"features\":[]}"); // Create a dummy GeoJSON

            // Act
            var result = _controller.GetLocalAuthorityBoundaries();

            // Assert
            var contentResult = Assert.IsType<ContentResult>(result);
            Assert.Equal("application/json", contentResult.ContentType);
            Assert.Contains("\"type\":", contentResult.Content); // Check for part of the GeoJSON structure

            // Clean up the file after test
            File.Delete(geoJsonFilePath);
        }

        [Fact]
        public void GetLocalAuthorityBoundaries_FileNotFound_ReturnsNotFound()
        {
            // Arrange
            var geoJsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "local_authorities.geojson");

            // Act
            var result = _controller.GetLocalAuthorityBoundaries();

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
