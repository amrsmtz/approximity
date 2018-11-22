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

