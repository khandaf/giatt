window.initializeMap = (accessToken, geoJsonUrl) => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.1276, 51.5074], // Center map to London
        zoom: 5
    });
    let boundariesVisible = true;
    const toggleBtn = document.getElementById('toggle-btn');
    map.on('load', () => {
        // Fetch GeoJSON from a URL
        fetch(geoJsonUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading').remove();
                document.getElementById('map').style.opacity = 1;

                // Get the select element by its ID
                const selectElement = document.getElementById('localAuthoritiesDropdown');

                // Extract the 'name' property from each feature
                const names = data.features.map(feature => feature.properties.name).sort();

                names.forEach(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;

                    // Append the option to the select element
                    selectElement.appendChild(option);
                });

                // Function to display the boundaries on the map
                function displayBoundaries(selectedName) {
                    // Find the selected feature from the GeoJSON data
                    const selectedFeature = data.features.find(feature => feature.properties.name === selectedName);

                    if (selectedFeature) {
                        // Remove the previous layer if any
                        if (map.getSource('selected-boundary')) {
                            map.removeLayer('boundary-layer');
                            map.removeSource('selected-boundary');
                        }

                        // Add the selected feature to the map
                        map.addSource('selected-boundary', {
                            'type': 'geojson',
                            'data': selectedFeature
                        });

                        map.addLayer({
                            'id': 'boundary-layer',
                            'type': 'fill',
                            'source': 'selected-boundary',
                            'paint': {
                                'fill-color': '#0080ff',
                                'fill-opacity': 0.5
                            }
                        });

                        let coordinates = selectedFeature.geometry.coordinates;
                        let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;

                        // Loop through each coordinate pair
                        coordinates[0].forEach(coord => {
                            const [lng, lat] = coord;

                            // Update the bounds
                            minLng = Math.min(minLng, lng);
                            minLat = Math.min(minLat, lat);
                            maxLng = Math.max(maxLng, lng);
                            maxLat = Math.max(maxLat, lat);
                        });
                        if (!isNaN(minLng) && !isNaN(minLat) && !isNaN(maxLng) && !isNaN(maxLat)) {
                            const bounds = [[minLng, minLat], [maxLng, maxLat]];
                            map.fitBounds(bounds, { padding: 20 });
                        }
                    }
                }

                // Event listener to handle the dropdown change event
                selectElement.addEventListener('change', function () {
                    const selectedValue = selectElement.value; // Get the selected name from the dropdown
                    displayBoundaries(selectedValue); // Display the boundary for the selected name
                });
                // Add the GeoJSON source
                map.addSource('local-authorities', {
                    type: 'geojson',
                    data: data
                });

                // Add a layer for the source
                map.addLayer({
                    id: 'local-authorities-boundaries',
                    type: 'fill',
                    source: 'local-authorities',
                    paint: {
                        'fill-color': '#0080ff',
                        'fill-opacity': 0.3
                    }
                });

                // Add a boundary outline
                map.addLayer({
                    id: 'local-authorities-outline',
                    type: 'line',
                    source: 'local-authorities',
                    paint: {
                        'line-color': '#808080',
                        'line-width': 1
                    }
                });
            });

        // Add labels layer
        map.addLayer({
            id: 'boundaries-labels',
            type: 'symbol',
            source: 'local-authorities',
            layout: {
                'text-field': ['get', 'LAD23NM'],
                'text-size': 11,
                'text-font': ['Open Sans Semibold'],
                'visibility': 'visible'
            },
            paint: {
                'text-color': '#333333',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1
            }
        });
        
        // After loading the data
        map.setFilter('english-local-authorities', [
            'all',
            ['==', ['get', 'country'], 'England'],
            ['==', ['get', 'admin_level'], 5] // Typically local authority level
        ]);

        // Hide all other layers
        map.getStyle().layers.forEach(layer => {
            if (layer.id !== 'english-local-authorities') {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
            }
        });

        // Toggle button functionality
        toggleBtn.addEventListener('click', () => {
            boundariesVisible = !boundariesVisible;

            // Toggle visibility
            const visibility = boundariesVisible ? 'visible' : 'none';
            map.setLayoutProperty('local-authorities-boundaries', 'visibility', visibility);
            map.setLayoutProperty('local-authorities-outline', 'visibility', visibility);
            map.setLayoutProperty('boundaries-labels', 'visibility', visibility);

            // Update button text
            toggleBtn.textContent = boundariesVisible ?
                'Hide' : 'Show';
        });
    });
    
};
