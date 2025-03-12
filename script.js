
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
                <p class="card-country">${destination.country}</p>
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
        if (id == null) { // redirect to index.html
            window.open("index.html", "_self");
            return;
        }
        let destination = destinationsData.destinations.find(destination => destination.id == id);
        let latitude = destinationsData.destinations[destination.id-1].details.location.latitude;
        let longitude = destinationsData.destinations[destination.id-1].details.location.longitude;
        let output = `
        <img src="${destination.image_large}" alt="${destination.name}">
        <div class="card-body">
            <h1 class="card-title">${destination.name}</h1>
            <p class = "card-country">Country: ${destination.country}</p>
            <p class="card-description">${destination.details.long_description}</p>
            <p class="card-land-area">Land area: ${destination.details.area}</p3>
            <p class="card-population">Population: ${destination.details.population}</p3>
            <p class="card-language">Language spoken: ${destination.details.language}</p>
            <p class="card-currency">Currency: ${destination.details.currency}</p>
            <p class="card-popular-destinations">Popular Destinations: ${destination.details.popularDestinations.join(", ")}</p>
        `;
        document.title = "Discover Europe - "+destination.name; // dynamic title change
        
        document.getElementById("detailed-destination-container").innerHTML = output;

        // map specific code
        // get lat and long based on destination id -1 since the id starts from 1
        let map = L.map('map-container').setView([latitude, longitude], 10);

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
            let destinationCity = destination.name.toLowerCase();
            let destinationCountry = destination.country.toLowerCase();
            if (query!="" && (((destinationCity == query || query == destinationCity.substring(0, query.length))) //city search
                || (destinationCountry == query || query == destinationCountry.substring(0, query.length)))) { //country search
                results.push(destination);
            }
        })

        let output = "";
        if (results.length>0){ //results are found, display them.
        //display results, when clicked view on destinaiton.html page
            results.forEach(destination => {
                output += `
                <div class="result-item" onclick="window.open('destination.html?id=${destination.id}', '_self')">
                <img src="${destination.image}" alt="${destination.name}">
                <div class="result-body">
                    <h2 class="result-title">${destination.name}</h2>
                    <p class="result-text">${destination.country}</p>
                </div>
                </div>
                `;

            });
        }else { // no results
            output+=`
            <section class="result-item">
                <div class = "result-body">
                    <p class = "result-text">No results</p>
                </div>
            </section>
            `;
            
        }
        // add each result to the results container 
        document.getElementById("results-container").innerHTML = output;
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
// function validateForm(){ // ensures form is filled out correctly

// }
function submitForm(event){ // process form, print to console as proof of concept
    event.preventDefault(); // ensures page is not reloaded - stays on the same page
    
    try {
        let destinationSelect = document.getElementById("destination-select");
        let destination = destinationSelect.options[destinationSelect.selectedIndex].text; // get text from dropdown, instead of value which is ID
        let name = document.getElementById("name-input").value;
        let email = document.getElementById("email-input").value;
        let numTravelers = document.getElementById("travelers-input").value;
        let date = document.getElementById("date-input").value;
        console.log("---Form Submitted---");
        console.log("Destination: "+destination);
        console.log("Name: "+name);
        console.log("Email: "+email);
        console.log("Number of Travelers: "+numTravelers);
        console.log("Date: "+date);
        alert("Booking confirmed!");
    } catch (error) {
        console.error("error in submitForm (form has incomplete entries): "+error);
    }
}

if (document.location.href.includes("index.html")) {
    window.onload = loadDestinations();
    }

// open the destination details page based on page title
if (document.location.href.includes("destination.html")) {
    window.onload = loadDestinationDetails();
    }

