import "bootstrap";
import Typed from 'typed.js';

var options = {
  strings: ["BAKERY", "SHOE REPAIR", "BUTCHER"],
  typeSpeed: 80,
  loop: true
}

if (document.getElementById('typedjs')) {
  var typed = "Look for: " + new Typed("#typedjs", options);
}

const map_button = document.querySelector("#map-button");

if (map_button) {
  map_button.addEventListener("click", (event) => {
    if (document.querySelector(".mapboxgl-canary") === null) {
      setTimeout(() => {
        mapboxgl.accessToken = process.env.publickey;
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9'
        });
      }, 1000);
    }
  })
}

if (document.getElementById('map')) {
  mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
  });
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
