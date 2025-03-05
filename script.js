
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
        <section class="destination-details">
        <img src="${destination.image_large}" alt="${destination.name}" class="card-img-top">
        <div class="card-body">
            <h1 class="card-title">${destination.name}</h1>
            <p class="card-population">Population: ${destination.details.population}</p3>
            <p class="card-language">Language Spoken: ${destination.details.language}</p>
            <p class="card-currency">Currency: ${destination.details.currency}</p>
        
            <p class="card-description">${destination.description}</p>
            <p class="card-itinerary">${destination.details.itinerary}</p>
        </section>
        `;
        document.getElementById("detailed-destination-container").innerHTML = output;

        // map specific code
        // get lat and long based on destination id -1 since the id starts from 1
        
        let map = L.map('map-container').setView([latitude, longitude], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


    } catch (error) {
        console.error("Error manipulating JSON to HTML: "+error);
    }
}
async function searchDestinations() {
    try {
        
        let response = await fetch("destinationsData.json");
        let destinationsData = await response.json();
        let results = [];
        let query = document.getElementById("search-box").textContent;
        console.log(document.getElementById("search-box").text);
        console.log(query.textContent);

        // find destinations that match search query
        destinationsData.destinations.forEach( destination => {
            if (destination.name == query){ // use lowercase of query and destination
                results.push(destination);
            }
        })



        let output = "";
        //asynchronously display results, when clicked view on destinaiton.html page
        results.forEach(destination => {
            output += `
            <section class="result-item" onclick="window.open('destination.html?id=${destination.id}', '_self')">
            <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${destination.name}</h2>
                <p class="card-text">${destination.description}</p>
            </div>
            </section>
            `;
        });
        // add data to the results container
        document.getElementById("results-container").innerHTML = output;


    } catch (error) {
        console.error("error in searchDestinations: "+error);
    }
    
}


if (document.location.href.includes("index.html")) {
    window.onload = loadDestinations();
    }

// open the destination details page based on page title
if (document.location.href.includes("destination.html")) {
    window.onload = loadDestinationDetails();
    }

// if (document.location.href.includes("search.html")){
//     // run search function -- NO only if user clicks search
//     }

