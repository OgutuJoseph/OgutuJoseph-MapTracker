import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

const coordinates = 
[
    [-1.298982, 36.776811],
    [-1.297459, 36.776747],
    [-1.296193, 36.776726],
    [-1.296097, 36.779236],
    [-1.296151, 36.777637],
    [-1.296215, 36.776693],
    [-1.294252, 36.776586],
    [-1.294048, 36.776790],
    [-1.293973, 36.779118],
    [-1.292622, 36.779075],
    [-1.291844, 36.779049],
];

mapboxgl.accessToken = 'pk.eyJ1Ijoib2d1dHVqb3NlcGgiLCJhIjoiY2tmeWM3bXZsMnd1bzJ5cGFqc3A2aHVrdyJ9.4AT6yRgQr4qiBMvE0fAsHg';
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-1.296215, 36.776693],
    zoom: 15
});

//display tracking route
map.on("load", function () {
    map.addSource("route", {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates:  coordinates
            }
        }
    });
    map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
        "line-join": "round",
        "line-cap": "round"
    },
    paint: {
        "line-color": "#888",
        "line-width": 8
    }
    });
});


//To display Driver's Name
map.on('load', function () {
    map.addSource('places', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                type: 'Feature',
                properties: {
                    description:
                    '<strong>Name: </strong><p>Driver A</p>',
                    icon: 'theatre'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.291844, 36.779049],
                    }
                }, 
            ]
        }
        
    });
    // Add a layer showing the places.
    map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
        }
    });
      
    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
      
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
      
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
      
    map.on('ouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});