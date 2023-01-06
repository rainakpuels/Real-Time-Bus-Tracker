// Load map 
function init(){
	var myOptions = {
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var element = document.getElementById('map');
  	map = new google.maps.Map(document.getElementById('map'), {
      center: { lat:42.353350,lng:-71.091525},
      zoom: 14,
      mapId: '966a5ed34d5977dd'
      });
  	addMarkers();
}

// Request route 1 bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

// Add bus markers to map
async function addMarkers(){

  // Get bus data
	var locations = await getBusLocations();

	// Loop through data, add bus markers
	locations.forEach(function(bus){
		var marker = getMarker(bus.id);		
		if (marker){
			moveMarker(marker,bus);
		}
		else{
			addMarker(bus);			
		}
	});

	// Timer
	console.log(new Date());
	setTimeout(addMarkers,10000);
}

// Set up array to hold the markers
var markers = [];

// Add marker
function addMarker(bus){
	var icon = setIconRt1(bus);
	var marker = new google.maps.Marker({
	    position: {
	    	lat: bus.attributes.latitude, 
	    	lng: bus.attributes.longitude
	    },
	    map: map,
	    icon: icon,
	    id: bus.id
	});
	markers.push(marker);
}

// Set route icon
function setIconRt1(bus){
		return './images/red.png';
} 

// Move marker
function moveMarker(marker,bus) {
	var icon = setIconRt1(bus);

// Move marker with bus data
  marker.setPosition( {
    lat: bus.attributes.latitude, 
    lng: bus.attributes.longitude
	});
} 

// Get marker
function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

window.onload = init;
