import { Photograph } from './photographe.js';

const photographContainer = document.querySelector(".homepage__content");
const topButton = document.querySelector(".anchor");

topButton.addEventListener("focus", () => {
    topButton.style.opacity = "1";
    topButton.addEventListener("focusout", () => { topButton.style.opacity = "0"; })
})

//Store data de tout les photographes
let photographData = [];
//Store les data des photographes à afficher
let photographList = [];

let filterOn = false;
//Loading all photograph
getAllPhotograph();


//event listener sur le changement de # de l'url
window.addEventListener("hashchange", filtering);

//Filter proxy 
function filtering() {
    let filter = window.location.hash;
    if (filter == "") {
        photographList = photographData;
        filterOn = false;
    } else {
        photographeFiltering(filter);
        filterOn = true;
    }
    listRender();
}
//Event Listener on filters
let filters = document.querySelectorAll(".filter");
for (let filterElement of filters) {
    filterElement.addEventListener('click', () => {
        if (window.location.hash == filterElement.innerHTML.toLowerCase() && filterOn == true) {
            setTimeout(() => { window.location.hash = ""; }, 10);
        }

    })
}
//Render photograph
function listRender() {
    //delete all photograph
    for (let photographs of document.querySelectorAll('.card')) {
        photographs.remove();
    }

    //if no filter 
    if (photographList.length == 0) {
        //render all photograph
        photographList = photographData;
    }
    //rendering photographers

    for (let photograph of photographList) {

        //Extracting tags and prerendering html
        let photographTagRender = "";
        for (let tag of photograph.tags) {
            photographTagRender += `<a class="filter" href="#${tag}" aria-label="filtre ${tag}">#${tag}</a>`;
        }
        photographContainer.insertAdjacentHTML("beforeend", `
            <div class="card">
            <a href="profile.html?${photograph._id}" class="card__link" alt="${photograph._name}">
                <img class="card__image" src="./asset/Photographers ID Photos/${photograph._portrait}"/>
                <h2 class="card__title">${photograph._name}</h2>
            </a>            
            <p class="card__location">${photograph.city}, ${photograph._country}</p>
            <p class="card__bio"${photograph._tagline}</p>
            <p class="card__price">${photograph._price}€/jour</p>
            <div class="card__tags" alt="Tag">${photographTagRender}</div>
            </div>
        `);
    }

}

// filter all photograph into a list matching filter tag
function photographeFiltering(filter) {
    //check each photograph
    photographList = photographData.filter((photograph) => {
        //check photograph tag
        for (let tag of photograph.tags) {
            //check tag match filter
            if (tag == filter.substring(1)) {

                return true;
            }
        }
        return false;
    })

}

//loop through json to instantiate photograph object
function getAllPhotograph() {
    let allPhotograph = [];
    fetch("./data/data.json")
        .then(response => response.json()) //transforme la reponse en json
        .then(data => data.photographers) //extrait les photographes des données json
        .then((jsonData) => { //crée un objet Photograph pour chaque photograph des données json
            for (let i = 0; i < jsonData.length; i++) {
                allPhotograph.push(new Photograph(jsonData[i].name, jsonData[i].id, jsonData[i].city, jsonData[i].country, jsonData[i].tags, jsonData[i].tagline, jsonData[i].price, jsonData[i].portrait))
            }
            photographData = allPhotograph;
        })
        .then(() => { filtering() });
}