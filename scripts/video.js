export class Video {


    constructor(id, photographerId, title, video, tags, like, date, price, alt) {
        this._id = id;
        this._photographerId = photographerId;
        this._title = title;
        this._tags = tags;
        this._video = video;
        this._price = price;
        this._like = like;
        this._date = date;
        this._alt = alt;
    }


    liked() {
        this._like += 1;
    }
    render(parent, index, folderName) {
        parent.insertAdjacentHTML("beforeend", `
                        <div class="gallery__item">
                        <div class="gallery__item__element" id="${index}">
                            <a alt="${this._title},closeup view" href="#${index}" class="gallery__lightbox-link">
                                <video class="gallery__item__image"  tabindex="-1">
                                    <source src="ressources/images/${folderName[0]}/${this._video}"></source>
                                    <p>${this._alt}</p>
                                </video>
                            </a>
                        </div>       
                            <div class="gallery__item__details">
                                <p>${this._title}</p>
                                    <div class="gallery__item__details__like" aria-label="likes">
                                        <p class="item-likeCount">${this._like} </p><button class="like-button" aria-label="like"><span class="fas fa-heart"></span></button>
                                    </div>
                            </div>                
                        </div>
                `);
    }
    renderLightbox(folderName) {

        return `<video controls class="lightbox__video"><source src="ressources/images/${folderName[0]}/${this._video}" alt="${this._title}"></source></video><p class="lightbox__title">${this._title}</p>`;
    }
}