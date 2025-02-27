// function getDestinations() {
//     return JSON.parse(destinationsData);
// }
// function populateCards(){
//     const destinations = getDestinations();
//     const cardContainer = document.getElementById("card-container");
//     for(let i=0; i<destinations.length; i++){
//         const card = createCard(destinations[i]);
//         cardContainer.appendChild(card);
//     }
// }
// function createCard(destination){
//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = `
//         <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
//         <div class="card-body">
//             <h5 class="card-title">${destination.name}</h5>
//             <p class="card-text">${destination.description}</p>
//             <button class="btn btn-primary" onclick="showDetails(${destination.id})">View Details</button>
//         </div>
//     `;
// }

// function Destination(id, name, image, description, details){ // destination object contsructor
//     this.id = id;
//     this.name = name;
//     this.image = image;
//     this.description = description;
//     this.details = details;

// }

// fetch("destinationsData.json")
//     .then(response => response.json())
//     .then(data => {
//         const container = document.getElementById("destinations-container");
//         data.Array.forEach(destination => {
//             const card = document.createElement("div");
//             card.className = "destination-card";
//             card.innerHTML = `
//             <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
//             <div class="card-body">
//                 <h5 class="card-title">${destination.name}</h5>
//                 <p class="card-text">${destination.description}</p>
//             <div>
//             `;
//             container.appendChild(card);
//             // localStorage.setItem("destinationsData", JSON.stringify(data));
//             // populateCards();
//         });
//     })
//     .catch(error => console.error(error)
// );

async function loadDestinations() {
    try {
        const response = await fetch("destinationsData.json");
        const destinationsData = await response.json();

        let output = ""; // initialize data variable
        // loop through the data in each destination object in the json
        destinationsData.destinations.forEach(destination => {
            output += `
            <section class="destination-card">
            <img src="${destination.image}" alt="${destination.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${destination.name}</h5>
                <p class="card-text">${destination.description}</p>
            </div>
            </section>
            `;
        });
        // add data to the destination container
        document.getElementById("destinations-container").innerHTML = output;

        } catch (error) {
            console.error(error);
        }

    }

window.onload = loadDestinations();
