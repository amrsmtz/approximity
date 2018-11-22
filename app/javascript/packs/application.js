import "bootstrap";
import Typed from 'typed.js';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'



var options = {
  strings: ["BAKERY", "SHOE REPAIR", "BUTCHER"],
  typeSpeed: 80,
  loop: true
}

if (document.getElementById('typedjs')) {
  var typed = "Look for: " + new Typed("#typedjs", options);
}

// Mapbox Map page

const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/walking',
    controls: {
      inputs: true
    }
  });

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });

  directions.setOrigin([-73.567256, 45.5016889]);
  directions.setDestination([-73.6, 45.5016889]);

  map.addControl(directions, 'top-left');
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

