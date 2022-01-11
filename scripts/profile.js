import { Factory } from './Factory.js';
import { modalSetUp } from './modal.js';
import { lightboxClick } from './Lightbox.js';

const profile = document.querySelector("#profile");
const gallery = document.querySelector("#gallery");
const trier = document.querySelector("#image-filter");
const lightbox = document.querySelector("#lightbox");

//List of media
let mediaList = [];
let photographInfo;
let photographtags = "";
let folderName;

//Close modals on Escape key press
window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        lightbox.style.display = "none";
        let modal = document.querySelector(".modal");
        modal.style.display = "none";
    }
});

//Filter feature event
trier.addEventListener("change", (event) => {
    filterMedia(event.target.value);
});


//FILTERING
function filterMedia(filter) {
    if (filter == "popularity") { mediaList.sort(compareLike); }
    if (filter == "date") { mediaList.sort(compareDate); }
    if (filter == "title") { mediaList.sort(compareTitle); }
    renderGallery();
}

//compare title of two differents elements title to return a value 
function compareTitle(a, b) {

    if (a._title < b._title) {
        return -1;
    }
    if (a._title > b._title) {
        return 1;
    }
    return 0;
}

//compare likes of two differents elements to return a value 
function compareLike(a, b) {

    if (a._like > b._like) {
        return -1;
    }
    if (a._like < b._like) {
        return 1;
    }
    return 0;
}

//compare date of two differents elements to return a value 
function compareDate(a, b) {

    if (a._date < b._date) {
        return -1;
    }
    if (a._date > b._date) {
        return 1;
    }
    return 0;
}
//GALLERY RENDERING
function renderGallery() {

    let index = 0;
    for (let item of document.querySelectorAll('.gallery__item')) {
        item.remove();
    }
    for (let media of mediaList) {
        media.render(gallery, index, photographInfo.name.split(" "));
        index++;
    }
    lightboxClick(mediaList, folderName);
}
//count total like of media
function likeTotal() {
    let totalLikes = 0;
    for (let media of mediaList) {
        totalLikes += media._like;
    }
    document.querySelector(".like-number").innerHTML = totalLikes;
}
//Like feature
function like() {
    let likeButtons = document.querySelectorAll(".like-button");
    for (let button of likeButtons) {
        button.addEventListener("click", () => {
            //select selectione le media(photo ou video) lié au bouton like           
            let media = button.closest(".gallery__item").querySelector(".gallery__item__element");
            mediaList[media.id].liked(); //incrementation du compte de like du media
            media.closest(".gallery__item").querySelector(".item-likeCount").innerHTML = mediaList[media.id]._like; //mise a jour du compteur de like
            likeTotal(); //mise a jour du compteur de like total
        });
    }
}

function renderProfile() {
    //extract photographer first name  for the photo folder
    folderName = photographInfo.name.split(" ");
    //extract photographer's tag and render them        
    for (let tag of photographInfo.tags) {
        photographtags += `<a class="filter" href="./index.html#${tag}" aria-label="filtre ${tag}">#${tag}</a>`
    }
    //render of photopraph profile
    profile.insertAdjacentHTML('afterbegin',
        ` <div class="card--profile__desc">
                            <h1 class="card__title card__title--profile">${photographInfo.name}</h1>
                            <p class="card__location card__location--profile">${photographInfo.city},${photographInfo.country}</p>
                            <p class="card__bio">${photographInfo.tagline}</p>
                            <div class="card__tags" alt="Tag">${photographtags}</div>
                            </div>            
                            <button class="button--contact" alt="Contact Me">Contactez-moi</button>
                            <img src="asset/Photographers ID Photos/${photographInfo.portrait}" alt="${photographInfo.name}" class="card__image card__image--profile"/>
                            `);
    //set up event listener for the contact modal from modal.js
    modalSetUp();
    document.querySelector(".sticky__tarif").innerHTML = `${photographInfo.price}€ / jours`;
}
//DATA FETCHING
fetch("./data/data.json")
    .then(response => response.json()) //transforme la reponse en json
    .then(data => {
        //get photograph from json searching with id passed by url
        photographInfo = data.photographers.find(element => element.id == window.location.search.substring(1));
        for (let media of data.media) {
            if (media.photographerId == window.location.search.substring(1)) {
                mediaList.push(Factory.createMedia(media));
            }
        }
        renderProfile();
        renderGallery();
        likeTotal()
        like();
    })