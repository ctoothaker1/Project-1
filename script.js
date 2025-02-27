
async function loadDestinations() {
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

async function loadDestinationDetails() {
    try {
        const response = await fetch("destinationsData.json");
        const destinationsData = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const destination = destinationsData.destinations.find(destination => destination.id == id);
        let output = `
        <section class="destination-details">
        <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
        <div class="card-body">
            <h1 class="card-title">${destination.name}</h1>
            <p class="card-text">${destination.description}</p>
        </section>
        `;
        document.getElementById("detailed-destination-container").innerHTML = output;

} catch (error) {
    console.error("Error manipulating JSON to HTML: "+error);
}
}

if (document.location.href.includes("index.html")) {
    window.onload = loadDestinations();
    }

// open the destination details page based on page title
if (document.location.href.includes("destination.html")) {
    window.onload = loadDestinationDetails();
    }

