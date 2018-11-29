import "bootstrap";
import Typed from 'typed.js';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

// Typed js for the Landing page

const colors = ['#4a4a4a','#4a4a4a','#4a4a4a','#4a4a4a','#4a4a4a','#4a4a4a']

var options = {
  strings: ["BAKERY", "SHOE REPAIR", "BUTCHER"],
  typeSpeed: 80,
  loop: true
}

if (document.getElementById('typedjs')) {
  var typed = "Look for:" + new Typed("#typedjs", options);
}

// Autocomplete on the start location and end location
const places = require('places.js');

const addressInputStartBanner = document.getElementById('flat_address_start_banner');

if (addressInputStartBanner) {
  const placesAutocomplete = places({
    container: addressInputStartBanner
  });
}

const addressInputStart = document.getElementById('flat_address_start');

if (addressInputStart) {
  const placesAutocomplete = places({
    container: addressInputStart
  });
}

const addressInputEnd = document.getElementById('flat_address_end');

if (addressInputEnd) {
  const placesAutocomplete = places({
    container: addressInputEnd
  });
}

// Mapbox Map page

const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

  // Initialize the map

  const markers = JSON.parse(mapElement.dataset.markers);
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });

  const bounds = new mapboxgl.LngLatBounds();

  console.log(markers);
  let j = 0;

  markers.forEach((marker, i) => {
    // set the boundaries of the map
    bounds.extend([marker.lng, marker.lat]);
    // console.log(marker);
    // create HTML pins for the markers
    var el = document.createElement('div');
    el.className = 'marker';
    //el.innerHTML = '<i class="fas fa-map-marker"></i><br>' ;//'<i class="fas fa-map-marker"></i>';
    // el.innerHTML += `${marker.category}`

    // el.style.color = colors[j];

    // make a marker for each feature and add to the map
    if (i !== 0) {
      // var popup = new mapboxgl
      //   .Popup({ offset: 25,
      //     closeOnClick: false })
      //   .setHTML(marker.popHTML);

      var popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat([marker.lng, marker.lat])
        .setHTML(marker.popHTML)
        .addTo(map);

      new mapboxgl.Marker(el)
      .setLngLat([marker.lng, marker.lat])
      // .setPopup(popup)
      .addTo(map);
    }
    console.log(j + 2);

    j = j + 1;
  });

// map.addSource('route', {
//   type: 'geojson',
//   data: nothing
// });

// map.addLayer({
//   id: 'routeline-active',
//   type: 'line',
//   source: 'route',
//   layout: {
//     'line-join': 'round',
//     'line-cap': 'round'
//   },
//   paint: {
//     'line-color': '#3887be',
//     'line-width': {
//       base: 1,
//       stops: [[12, 3], [22, 12]]
//     }
//   }
// }, 'waterway-label');

  map.fitBounds(bounds, { duration: 0, padding: 200, offset: [-160, 0] })

  const intervalId = setInterval(() => {
    if (map.isMoving()) {
      map.stop();
      // clearInterval(intervalId);
    }
  }, 1);

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

  map.on('load', function() {

    directions.setOrigin([markers[0].lng, markers[0].lat]);
    markers.slice(1).forEach((marker) => {
      directions.addWaypoint(marker.index - 1, [marker.lng, marker.lat]);
    });
    directions.setDestination([markers[0].lng, markers[0].lat]);

    // map.getSource("route").setData(mapElement.dataset.geojson)
  });

  map.addControl(directions);
}
