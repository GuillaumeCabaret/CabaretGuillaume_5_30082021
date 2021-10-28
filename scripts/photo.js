export class Photo {


    constructor(id, photographerId, title, image, tags, like, date, price, alt) {
        this._is = id;
        this._photographerId = photographerId;
        this._title = title;
        this._tags = tags;
        this._image = image;
        this._price = price;
        this._like = like;
        this._date = date;
        this._alt = alt;
    }

    liked() {
        this._like += 1;
        //rerender like count
    }

    render(parent, index, folderName) {
        parent.insertAdjacentHTML("beforeend", `
                    <div class="gallery__item">
                        <div class="gallery__item__element" id="${index}">
                            <a alt="${this._title},closeup view" href="#${index}" class="gallery__lightbox-link">
                                <img src="asset/${folderName[0]}/${this._image}" class="gallery__item__image" alt-text ="${this._alt}" />
                            </a>                            
                        </div>
                        <div class="gallery__item__details">
                            <p >${this._title}</p>
                            <div class="gallery__item__details__like" aria-label="likes">
                                <p class="item-likeCount">${this._like} </p><button class="like-button" aria-label="Like"><span class="fas fa-heart"></span></button>
                            </div>                            
                        </div>                
                    </div>`);

    }
    renderLightbox(folderName) {
        return `<img src="asset/${folderName[0]}/${this._image}" class="lightbox__image" alt="${this._title}"/><p class="lightbox__title">${this._title}</p>`;
    }
}