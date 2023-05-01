


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