import "bootstrap";
import Typed from 'typed.js';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

// Typed js for the Landing page

var options = {
  strings: ["BAKERY", "SHOE REPAIR", "BUTCHER"],
  typeSpeed: 80,
  loop: true
}

if (document.getElementById('typedjs')) {
  var typed = "Look for:" + new Typed("#typedjs", options);
}

// Autocomplete on the start location and end location

const addressInputStart = document.getElementById('flat_address_start');

if (addressInputStart) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInputStart
  });
}

const addressInputEnd = document.getElementById('flat_address_end');

if (addressInputEnd) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInputEnd
  });
}

// Mapbox Map page

const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

  const markers = JSON.parse(mapElement.dataset.markers);
  // Initialize the map

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });

  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach((marker) => {
    bounds.extend([marker.lng, marker.lat]);
    var el = document.createElement('div');
    el.className = 'markers';
    el.style.backgroundImage = 'url(https://i.imgur.com/MK4NUzI.png)';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat([marker.lng, marker.lat])
    .addTo(map);
  });
  map.fitBounds(bounds, { duration: 0, padding: 200, offset: [-160, 0] })

  const intervalId = setInterval(() => {
    if (map.isMoving()) {
      map.stop();
      clearInterval(intervalId);
    }
  }, 1)

  // Add directions

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/walking',
    interactive: false,
    controls: {
      inputs: false,
      instructions: false
    }
  });

  const originValue = document.getElementById('flat_address_start').value

  //let features = []

  //markers.forEach((marker) => {
    //features.push({"type":"Feature","geometry":{"type":"Point","coordinates":[marker.lng, marker.lat]}});

  //});

  // const geojson =  {
  //   type: "geojson",
  //   data: {
  //     type: "FeatureCollection",
  //     features: features
  //   }
  // }

  // geojson.data.features.forEach(function(marker) {
  //   // create a HTML element for each feature
  //   var el = document.createElement('div');
  //   el.className = 'marker';

  //   // make a marker for each feature and add to the map
  //   new mapboxgl.Marker(el)
  //   .setLngLat(marker.geometry.coordinates)
  //   .addTo(map);
  // });

  map.addControl(directions);

  map.on('load', function() {
  //   map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
  //     if (error) throw error;
  //     map.addImage("custom-marker", image);
  //     /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
  //     map.addLayer({
  //       id: "markers",
  //       type: "symbol",
  //        Source: A data source specifies the geographic coordinate where the image marker gets placed.
  //       source: geoJson,
  //         layout: {
  //           "icon-image": "custom-marker",
  //         }
  //     });
  //   });
    directions.setOrigin(originValue);
    markers.forEach((marker, i) => {
      directions.addWaypoint(i, [marker.lng, marker.lat]);
    });
    directions.setDestination(originValue);
  });
}
