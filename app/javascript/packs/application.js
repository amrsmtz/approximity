import "bootstrap";

const map_button = document.querySelector("#map-button");

map_button.addEventListener("click", (event) => {
  if (document.querySelector(".mapboxgl-canary") === null) {
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmdyYWhhbWZyZWVtYW4iLCJhIjoiY2pvcHo4bTRzMDh4OTNxcXZsMW9weG5sMCJ9.VqybDrZRkykOvm1vN8wGhw';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9'
      });
    }, 1000);
  }
})