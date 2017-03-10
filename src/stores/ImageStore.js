import {extendObservable} from 'mobx';

export default class ImageStore {
  constructor(){
    extendObservable(this, {
      images: []
    });
    this.addNewImage = this.addNewImage.bind(this);
  }

  addNewImage(img) {
    fetch('/gifs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(img)
    })
    .then(result => result.json())
    .then(image => {
      let allImages = this.images;
      allImages.push(image);
      this.images = allImages;
    });
  }

  setImages(images) {
    this.images = images;
  }
}
