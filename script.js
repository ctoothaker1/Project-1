function getDestinations() {
    return JSON.parse(destinationsData);
}
function populateCards(){
    const destinations = getDestinations();
    const cardContainer = document.getElementById("card-container");
    for(let i=0; i<destinations.length; i++){
        const card = createCard(destinations[i]);
        cardContainer.appendChild(card);
    }
}
function createCard(destination){
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${destination.name}</h5>
            <p class="card-text">${destination.description}</p>
            <button class="btn btn-primary" onclick="showDetails(${destination.id})">View Details</button>
        </div>
    `;
}

function Destination(id, name, image, description, details){ // destination object contsructor
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.details = details;

}

const destinationsData = `[
    {
        "id": 1,
        "name": "Paris",
        "image": "images/paris.jpg",
        "description": "Paris is the capital city of France.
        It is a major European city and has become one of the world's most popular tourist destinations.",
        "details": {
            "long_description": "Paris is a major European city and a global center for art, fashion, gastronomy and culture.",
            "population": "2.141 million",
            "area": "105 square kilometers",
            "language": "French",
            "currency": "Euro",
            "itinirary": [
                "Day 1: Arrive in Paris, visit the Eiffel Tower",
                "Louvre Museum",
                "Notre-Dame Cathedral",
                "Palace of Versailles",
                "Montmartre",
                "Seine River Cruise"
            ],
            "location": {
                "latitude": 48.8566,
                "longitude": 2.3522
            }
    },
    {
    "id": 2,
    "name": "London",
    
    }

]`;