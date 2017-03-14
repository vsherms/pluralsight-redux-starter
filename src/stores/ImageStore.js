import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';

export default class ImageStore {
  constructor(){
    extendObservable(this, {
      images: []
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.loadGifsFromServer = this.loadGifsFromServer.bind(this);
  }

  loadGifsFromServer() {
    fetch('/gifs')
       .then(result => result.json())
       .then(images => this.images = images);
  }

  handleDelete(imgId) {
    let newList = this.images.filter(img => img._id !== imgId);
    this.images = newList;
    fetch('/gifs/' + imgId, {
      method: 'DELETE'
    });
  }

  addNewImage(img) {
    fetch('/gifs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: img.name,
        url: img.url,
        description: img.description,
        userId: img.userId
      })
    })
    .then(result => result.json())
    .then(image => {
      let allImages = this.images;
      allImages.push(image);
      this.images = allImages;
    });
  }
}
