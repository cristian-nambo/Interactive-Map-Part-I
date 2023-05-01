//First we need users coordinates/ a way to pass the information by:

const myMap = {
    coordinates:[],
    businesses:[],
    map: {},
    markers: {},
 //Second, we need a place to put these coordinates. we will be using leaflet to make a map like in our previous assignments:
 buildMap() {
    this.map = L.map('map', {
    center: this.coordinates,
    zoom: 11,
    });
    // add openstreetmap tiles, recycleing code:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
    }).addTo(this.map)
    // Create and add the location with a marker
    const marker = L.marker(this.coordinates)
    marker
    .addTo(this.map)
    .bindPopup('<p1><b>You Are Here</b><br></p1>')
    .openPopup()
    },
    //Cheated a little here, we needed a for function/loop with an incrementor to add markers to the Map.
    addMarkers() {
		for (var i = 0; 
            i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
            //.openPopup()
		}
	},

}
///////Now that we have the basics we can get the user's coordinates://////////////////////////////////////////////////////////
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3VC4vFx3WlPsNvnVDBHOKmUPynM1I+R6bvIx/JsGe0K0='
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses

    //Could not get my markers to populate, checked against the solution and nothing worked, access to cors was on and off.
    // Requested temporary access to cors-anywhere through https://cors-anywhere.herokuapp.com/ still got error 403 forbidden
}
 /////////////////////////////////This was the outline foursquare gave it needs to be updated just to receive the date and use that to plug it into leaflet
 ////////////////////////////////We will process the data in the next step using the function
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'fsq3VC4vFx3WlPsNvnVDBHOKmUPynM1I+R6bvIx/JsGe0K0='
    //     }
    //   };
      
    //   fetch('https://api.foursquare.com/v3/places/search?query=query&ll=12%2C12&limit=5', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));    


// Process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}




window.onload = async () => {
	const coords = await getCoords()
	console.log(coords) //to polish up the code we will comment out these.
	myMap.coordinates = coords
	myMap.buildMap()
}

//Business submit button, Needs to do what we tell it to find.
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
    let data = await getFoursquare(business)
    myMap.business = processBusinesses(data)
    myMap.addMarkers() 
	console.log(business)// to polish up the code we will comment out these, 
})


/////////////////////////////////CODE CREATED WITH LEAF TO MAKE A MAP ///////////////////////////////////////////////////////////

// //Note: You do NOT need to create an external JS file for this project despite any instructions you may see in Canvas. This file, app.js, is the only external JS file you need.
// // Create map                                                       
// const myMap = L.map('map', {
//     center: [48.868672, 2.342130],
//     zoom: 12,
// });
// // Add OpenStreetMap tiles:
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     minZoom: '15',
// }).addTo(myMap)

// // Create and add a geolocation marker:
// const marker = L.marker([48.87007, 2.346453])
// marker.addTo(myMap).bindPopup('<p1><b>The Hoxton, Paris</b></p1>').openPopup()

// // Draw the 2nd Arrondissement                                          
// const latlngs = [[48.863368120198004, 2.3509079846928516],[48.86933262048345, 2.3542531602919805],[48.87199261164275, 2.3400569901592183],[48.86993336274516, 2.3280142476578813], [48.86834104280146, 2.330308418109664]]

// const polygon = L.polygon(latlngs, {
//     color: 'blue', 
//     fillOpacity: 0.0
// }).addTo(myMap);

// // Create red pin marker
// const redPin = L.icon({
//     iconUrl: './assets/red-pin.png',
//     iconSize:     [38, 38], // size of the icon
//     iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
//     popupAnchor:  [0, -38] // point from which the popup should open relative to the iconAnchor
// });

// // Metro station markers:
// const rS = L.marker([48.866200610611926, 2.352236247419453]).bindPopup('RÃ©aumur-SÃ©bastopol')
// //const rS = L.marker([48.866200610611926, 2.352236247419453], {icon: redPin}).bindPopup('RÃ©aumur-SÃ©bastopol')
// const sSD = L.marker([48.869531786321566, 2.3528590208055196]).bindPopup('Strasbourg-Saint-Denis')
// const sentier = L.marker([48.8673721067762, 2.347107922912739]).bindPopup('Sentier')
// const bourse = L.marker([48.86868503971672, 2.3412285142058167]).bindPopup('Bourse')
// const qS = L.marker([48.869560129483226, 2.3358638645569543]).bindPopup('Quatre Septembre')
// const gB = L.marker([48.871282159004856, 2.3434818588892714]).bindPopup('Grands Boulevards')

// const stations = L.layerGroup([rS, sSD, sentier, bourse, qS, gB]).addTo(myMap);


///////////////////////////////////////////////////////TARGETED ADS CODE////////////////////////////////////////////////

//// Get the user's coordinates:                                                              
// async function getCoords(){
//     pos = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
//     return [pos.coords.latitude, pos.coords.longitude]
// }

////console.log(getCoords());                              

// // Get the user's time:
// function userTime() {
//     const now = new Date()
//     return now.getHours()
// }

// // helper functions
// // check time of day
// function getMealTime(){
//     const tod = userTime()
    
//     if (tod > 20) {return 'late-night snack'}
//     else if (tod > 16) {return 'dinner'}
//     else if (tod > 11) {return 'lunch'}
//     else {return 'breakfast'}
// }
// // return tod > 20 ? 'late-night snack' : tod > 16 ? 'dinner' : tod > 11 ? 'lunch' : 'breakfast' // <--- this is an example of a ternary   
// // A ternary is another way to write an if-else statement
// // Another way to write the above lines would to refactor it as:

// //console.log(getMealTime())                   


// // build ads
// // Build Ad 1:                                                           
// function buildAd1(){
//     const mealTime = getMealTime()
//     let content = document.querySelector('.ad1')
//     let inner = document.createElement('p')
//     inner.innerHTML = `We've got the best <span>${mealTime}</span> in town`
//     content.append(inner)
// }
// //buildAd1()

// // Build Ad 2                                                             
// function buildAd2(coordinates){
//     const coords = coordinates
//     const href = `https://www.google.com/maps/search/coffee/@${coords[0]},${coords[1]},15z/`
//     let content = document.querySelector('.ad2')
//     let inner = document.createElement('p')
//     inner.innerHTML = `It's time to try our coffee! <span><a href="${href}" target="_blank">We're this close!</a></span>`
//     content.append(inner)
// }

// //console.log(buildAd2(getCoords()))

// // event listeners
// // On load, build ads:                                                             
// window.onload = async () => {
//     buildAd1()
//         const coords = await getCoords()
//     buildAd2(coords)
// }