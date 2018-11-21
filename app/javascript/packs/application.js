import "bootstrap";
import Typed from 'typed.js';

var options = {
  strings: ["BAKERY", "SHOE REPAIR", "BUTCHER"],
  typeSpeed: 80,
  loop: true
}

var typed = "Look for: " + new Typed("#typedjs", options);

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

