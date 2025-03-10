
async function loadDestinations() { // used exclusively in index.html
    try {
        const response = await fetch("destinationsData.json");
        const destinationsData = await response.json();

        let output = ""; // initialize data variable
        // loop through the data in each destination object in the json
        destinationsData.destinations.forEach(destination => {
            output += `
            <section class="destination-card" onclick="window.open('destination.html?id=${destination.id}', '_self')">
            <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${destination.name}</h2>
                <p class="card-text">${destination.description}</p>
            </div>
            </section>
            `;
        });
        // add data to the destination container
        document.getElementById("destinations-container").innerHTML = output;

        } catch (error) {
            console.error("Error manipulating JSON to HTML: "+error);
        }

    }

async function loadDestinationDetails() { // used exclusively in destination.html
    try {
        let response = await fetch("destinationsData.json");
        let destinationsData = await response.json();

        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get("id");
        let destination = destinationsData.destinations.find(destination => destination.id == id);
        let latitude = destinationsData.destinations[destination.id-1].details.location.latitude;
        let longitude = destinationsData.destinations[destination.id-1].details.location.longitude;
        let output = `
        <img src="${destination.image_large}" alt="${destination.name}">
        <div class="card-body">
            <h1 class="card-title">${destination.name}</h1>
            <p class="card-population">Population: ${destination.details.population}</p3>
            <p class="card-language">Language Spoken: ${destination.details.language}</p>
            <p class="card-currency">Currency: ${destination.details.currency}</p>
        
            <p class="card-description">${destination.description}</p>
            <p class="card-itinerary">${destination.details.itinerary}</p>
        `;
        document.title = "Travel the World - "+destination.name; // dynamic title change
        
        document.getElementById("detailed-destination-container").innerHTML = output;

        // map specific code
        // get lat and long based on destination id -1 since the id starts from 1
        
        let map = L.map('map-container').setView([latitude, longitude], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        populateFormDropdown(id);

    } catch (error) {
        console.error("Error in loadDestinationDetails() "+error);
    }
}

async function searchDestinations() { // runs when search button is clicked
    try {
        
        let response = await fetch("destinationsData.json");
        let destinationsData = await response.json();
        let results = [];
        let query = document.getElementById("search-box").value.toLowerCase();

        //Search logic - if exact match, push. if close match, still push. if no match, results.length = 0
        destinationsData.destinations.forEach( destination => {
            let destinationName = destination.name.toLowerCase();
            // console.log("query: "+query);
            // console.log("query length: "+query.length);
            // console.log("destination name: "+destination.name);
            // console.log("destination experiment: "+ destinationName.substring(0, query.length));
            if (query!="" && (destinationName == query || query == destinationName.substring(0, query.length))){
                results.push(destination);
            }
        })

        let output = "";
        if (results.length>0){ //results are found, display them.
        //display results, when clicked view on destinaiton.html page
            results.forEach(destination => {
                output += `
                <section class="result-item" onclick="window.open('destination.html?id=${destination.id}', '_self')">
                <img src="${destination.image}" alt="${destination.name}">
                <div class="card-body">
                    <h2 class="card-title">${destination.name}</h2>
                </div>
                </section>
                `;

            });
        }else {
            // no results
            output+=`
            <section class="result-item">
                <div class = "card-body">
                    <p class = "card-text">No results</p>
                </div>
            </section>
            `;
            
        }
        // add each result to the results container 
        document.getElementById("results-container").innerHTML = output; // ID not CLASS

    } catch (error) {
        console.error("error in searchDestinations: "+error);
    }
    
}

async function getDestinations() { //returns array of destinations
    let destinationsForDropdown = [];
    try {
        let response = await fetch("destinationsData.json");
        let destinationsData = await response.json();
        
        destinationsData.destinations.forEach( destination => {
                destinationsForDropdown.push(destination);
        })
    } catch (error) {
        console.error("error in getDestinations: "+ error);
    }
    return destinationsForDropdown;

}
async function populateFormDropdown(id){ // populate booking form dropdown given id of currently viewed destination
            let select = document.getElementById("destination-select");
            let destinations = getDestinations();
            let optionsOutput = ``;
            (await destinations).forEach(destination => {
                if (destination.id == id) { // auto select the current destination
                    optionsOutput += `<option value="${destination.id}" selected>${destination.name}</option>`;
                } else
                optionsOutput += `<option value="${destination.id}">${destination.name}</option>`;
            });
            select.innerHTML = optionsOutput;
}
function validateForm(){}
function submitForm(){}

if (document.location.href.includes("index.html")) {
    window.onload = loadDestinations();
    }

// open the destination details page based on page title
if (document.location.href.includes("destination.html")) {
    window.onload = loadDestinationDetails();
    }

