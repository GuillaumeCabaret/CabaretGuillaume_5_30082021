import { Video } from './video.js';
import { Photo } from './photo.js';

export class Factory {

    static createMedia(mediaInfo) {
        if ("video" in mediaInfo) {
            return new Video(mediaInfo.id, mediaInfo.photographerId, mediaInfo.title, mediaInfo.video, mediaInfo.tags, mediaInfo.likes, mediaInfo.date, mediaInfo.price, mediaInfo.alt);
        } else {
            return new Photo(mediaInfo.id, mediaInfo.photographerId, mediaInfo.title, mediaInfo.image, mediaInfo.tags, mediaInfo.likes, mediaInfo.date, mediaInfo.price, mediaInfo.alt)
        }
    }
}