This repository containes frontend and backend to display dataset provides administrative boundaries of local authorities in England as provided by the office for
National Statistics (ONS) using Mapbox.

	## Installation
	Clone the repository:
		git Clone https://github.com/khandaf/giatt.git
		
	## Requirements
		- .NET 8
		- C# 12.0
		- Node.js (for development purposes)
		
# Backend - Local Authorities API

	## Overview
	This project provides an API to retrieve local authority boundaries in GeoJSON format.

	## Features

	- Get Local Authority Boundaries: Retrieve the boundaries of local authorities as a GeoJSON file.
	
	## Usage

	1. cd LocalAuthoritiesApi


	2. Restore the dependencies:
		dotnet restore
		
		
	3. Build the project:
		dotnet build
		
	4. Run the application:
		GET /api/LocalAuthorities/boundaries
		
		
	## Testing

	The project includes unit tests to ensure the functionality of the API. To run the tests, use the following command:
	dotnet test

	## Project Structure

	- `Controllers/LocalAuthoritiesController.cs`: Contains the API controller for local authorities.
	- `Tests/LocalAuthoritiesControllerTests.cs`: Contains unit tests for the `LocalAuthoritiesController`.


#Frontend - Local Authorities
	
	## Overview

	Local Authorities Frontend is a Blazor WebAssembly application that displays local authority boundaries on a map using Mapbox. The application fetches GeoJSON data from an API and allows users to toggle the visibility of boundaries and select local authorities from a dropdown.

	## Features

	- Display local authority boundaries on a Mapbox map.
	- Toggle the visibility of boundaries.
	- Select local authorities from a dropdown to highlight their boundaries on the map.


	## Usage

	1. cd LocalAuthoritiesFrontend
	
	2. Restore the dependencies:
		dotnet restore
		
	3. Update `appsettings.json`
		- Open `wwwroot/appsettings.json` and update the `mapboxAccessToken` with your Mapbox access token and backend api url.
   
    4. Build the project:
		dotnet build

	5. Run the application:
		dotnet run
		
	6. Open the application:
		- Navigate to `https://localhost:5001` (port may be different in your local environment) in your web browse
		
	## Running Tests

	1. Navigate to the test project directory:
		cd LocalAuthoritiesFrontend.Tests
		
	2. Run the tests:
		dotnet test
		
		
	## Project Structure

	- `Pages/Map.razor`: The main component that displays the map and handles user interactions.
	- `wwwroot/js/map.js`: JavaScript file that initializes the Mapbox map and handles map-related logic.
	- `wwwroot/appsettings.json`: Configuration file for storing application settings.
	- `LocalAuthoritiesFrontend.Tests/MapTest.cs`: Unit tests for the `Map.razor` component using BUnit and xUnit.

	## Configuration

	- `mapboxAccessToken`: Your Mapbox access token.
	- `geoJsonUrl`: The API endpoint for fetching GeoJSON data.

	## Dependencies

	- [Blazor WebAssembly](https://docs.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-8.0)
	- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
	- [BUnit](https://bunit.dev/)
	- [xUnit](https://xunit.net/)


	By following these instructions, you should be able to set up, run, and test the Local Authorities Frontend application which.

   **Configuration and settings files in the web root (wwwroot folder) are visible to users on the client, and users can tamper with the data. Don't store app secrets, credentials, or any other sensitive data in any web root file. This can be secured using Azure KeyVault or Azure configuration**