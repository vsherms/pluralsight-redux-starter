import React from 'react';
import ShowGifs from './ShowGifs';
import { observer, inject } from 'mobx-react';
import { Row, Grid, Col } from 'react-bootstrap';

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
      <Grid>
      <Row>
      <ShowGifs gifs={this.props.imageStore.images} handleDelete={this.props.imageStore.handleDelete}
       addButton/>
       </Row>
       </Grid>
      </div>
    );
  }
}

DisplayGifs.propTypes = {
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};



export default inject('imageStore', 'userStore')(observer(DisplayGifs));
