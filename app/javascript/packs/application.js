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

if (document.getElementById('map')) {
  mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
  });
}
