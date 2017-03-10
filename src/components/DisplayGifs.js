import React from 'react';
import ShowGifs from './ShowGifs';

export default class DisplayGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      images: []
    };

    this.loadGifsFromServer = this.loadGifsFromServer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.loadGifsFromServer();
  }

  loadGifsFromServer() {
    fetch('/gifs')
       .then(result => result.json())
       .then(data => this.setState({
         images: data}));
  }

  removeClickedImage(img) {
    console.log(this.state.images);
    let filArr = this.state.images.filter(function(x){return x.name !== img.name;});
    this.setState({images: filArr});
  }


  handleDelete(imgId) {
    console.log(this.state.images);
    let newList = this.state.images.filter(img => img._id !== imgId);
    this.setState({images: newList});
    fetch('/gifs/' + imgId, {
      method: 'DELETE'
    });
  }

  render() {
    return(
      <div>
      <ShowGifs gifs={this.state.images} handleDelete={this.handleDelete}
      removeClickedImage={this.removeClickedImage} addButton/>

      </div>
    );
  }
}
