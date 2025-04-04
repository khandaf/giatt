using Bunit;
using LocalAuthoritiesFrontend.Pages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using Xunit;

namespace LocalAuthoritiesFrontend.Tests
{
    public class MapTest : TestContext
    {
        [Fact]
        public void MapComponentRendersCorrectly()
        {
            // Arrange
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()+ "/wwwroot")
                .AddJsonFile("appsettings.json")
                .Build();

            Services.AddSingleton<IConfiguration>(config);

            // Act
            var component = RenderComponent<Map>();

            // Assert
            component.Find("button#toggle-btn").MarkupMatches("<button id=\"toggle-btn\">Hide</button>");
            component.Find("h3").MarkupMatches("<h3>Select a Local Authority</h3>");
            component.Find("select#localAuthoritiesDropdown").MarkupMatches("<select id=\"localAuthoritiesDropdown\" class=\"form-control\"><option value=\"\">Select a name</option></select>");
            component.Find("div#loading").MarkupMatches("<div id=\"loading\">Loading England map...</div>");
            component.Find("div#map").MarkupMatches("<div id=\"map\" style=\"width: 100%; height: 600px;\"></div>");
        }
    }
}