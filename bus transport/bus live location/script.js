// Set up the map
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12
  });

  // Set up the bus locations list
  const busLocationsList = document.getElementById('bus-locations-list');

  // Function to update the bus locations list and map
  function updateBusLocations() {
    // Make an API call to retrieve the bus locations from Setrack
    fetch('https://api.setrack.com/v1/vehicles', {
      headers: {
        'Authorization': 'Bearer YOUR_SETACK_API_KEY'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Clear the bus locations list
      busLocationsList.innerHTML = '';

      // Loop through the bus locations and add them to the list
      data.vehicles.forEach(vehicle => {
        const busLocation = document.createElement('li');
        busLocation.textContent = `${vehicle.name} - ${vehicle.location.latitude}, ${vehicle.location.longitude}`;
        busLocationsList.appendChild(busLocation);

        // Add a marker to the map for each bus location
        const marker = new google.maps.Marker({
          position: { lat: vehicle.location.latitude, lng: vehicle.location.longitude },
          map: map,
          title: vehicle.name
        });
      });
    })
    .catch(error => console.error('Error updating bus locations:', error));
  }

  // Update the bus locations every 10 seconds
  setInterval(updateBusLocations, 10000);

  // Initialize the bus locations list and map
  updateBusLocations();
}
// Get the iframe element
var mapIframe = document.getElementById('map');

// Add event listener to bus links
var busLinks = document.querySelectorAll('.bus-link');
busLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    var busId = link.getAttribute('data-bus-id');
    // Update the iframe src attribute with the new bus location
    mapIframe.src = 'https://maps.google.com/maps?q=bus+location+' + busId + '&output=embed';
  });
});
