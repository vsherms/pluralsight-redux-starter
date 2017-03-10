import React from 'react';
import ShowGifs from './ShowGifs';
import { observer, inject } from 'mobx-react';

class DisplayGifs extends React.Component {

  constructor() {
    super();

    this.loadGifsFromServer = this.loadGifsFromServer.bind(this);
  }

  componentDidMount(){
    this.loadGifsFromServer();
  }

  loadGifsFromServer() {
    fetch('/gifs')
       .then(result => result.json())
       .then(data => this.props.imageStore.setImages(data));
  }

  render() {
    return(
      <div>
      <ShowGifs gifs={this.props.imageStore.images} handleDelete={this.props.imageStore.handleDelete}
       addButton/>

      </div>
    );
  }
}

export default inject('imageStore')(observer(DisplayGifs));
