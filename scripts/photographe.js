export class Photograph {


    constructor(name, id, city, country, tags, tagline, price, portrait) {
        this._name = name;
        this._id = id;
        this._city = city;
        this._country = country;
        this._tags = tags;
        this._tagline = tagline;
        this._price = price;
        this._portrait = portrait;
    }

    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get city() {
        return this._city;
    }
    get country() {
        return this._country;
    }
    get tags() {
        return this._tags;
    }
    get tagline() {
        return this._tagline;
    }
    get price() {
        return this._price;
    }
    get portrait() {
        return this._portrait;
    }
    set name(value) {
        this._name = value;
    }
    set id(value) {
        this._id = value;
    }
    set city(value) {
        this._city = value;
    }
    set country(value) {
        this._country = value;
    }
    set tags(value) {
        this._tags = value;
    }
    set tagline(value) {
        this._tagline = value;
    }
    set price(value) {
        this._price = value;
    }
    set portrait(value) {
        this._portrait = value;
    }
}