import React from 'react';
import { observer, inject } from 'mobx-react';
import { Row, Grid } from 'react-bootstrap';
import ImageComponent from './ImageComponent';

class Library extends React.Component {

  constructor() {
    super();
    this.prepareImages = this.prepareImages.bind(this);
  }

  prepareImages(){
    return this.props.imageStore.images.map(img =>
    <ImageComponent
    key={img._id}
    img={img}
    displaytype={'library'}/>);
  }

  render() {
    return(
      <div>
        <Grid>
          <Row>
            {this.prepareImages()}
          </Row>
        </Grid>
      </div>
    );
  }
}

Library.propTypes = {
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object,
  prepareImages: React.PropTypes.func
};



export default inject('imageStore', 'userStore')(observer(Library));
