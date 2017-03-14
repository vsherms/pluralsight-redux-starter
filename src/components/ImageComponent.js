import React from 'react';
import {Col, Image, Button, Glyphicon} from 'react-bootstrap';
import {inject, observer} from 'mobx-react';

class ImageComponent extends React.Component {

  constructor() {
    super();
    this.triggerSaveToLibraryRemoveFromList = this.triggerSaveToLibraryRemoveFromList.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.prepareButtons = this.prepareButtons.bind(this);
  }

  triggerSaveToLibraryRemoveFromList(e) {
    this.props.saveToLibRemoveFromList(this.props.img);
  }

  triggerDelete(e){
    this.props.imageStore.handleDelete(this.props.img._id);
  }

  prepareButtons(){
    let button = <div style={{width:'280px', height:'40px'}}></div>;
    if(this.props.displaytype == 'library' && (this.props.userStore.userId == this.props.img.userId)){
       return (
        <Button style={{width:'280px', marginBottom: '10px'}} onClick={this.triggerDelete} type="submit"
         className="brn btn-danger" block><Glyphicon glyph="remove-circle"/>     Delete</Button>
      );
    }
    if(this.props.displaytype !== 'library') {
       return (
      <Button style={{width: '280px', marginBottom: '10px'}} onClick={this.triggerSaveToLibraryRemoveFromList} bsStyle="success" Glyphicon glyph="plus-sign" block>Add To Library</Button>
      );
    }
    return button;
  }

  render() {
    const imageWellStyle = {maxWidth: 280, margin: '0px', padding:'0px'};
    let button = this.prepareButtons();

    return (
      <div className="text-center col-lg-3 col-md-4 col-sm-6" key={this.props.img.name}>
        <div style={imageWellStyle}>
           <Image height="280" width="280" src={this.props.img.url} rounded/>
           {button}
         </div>
       </div>
      );
    }
}

ImageComponent.propTypes = {
  img: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  addButton: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  handleDelete: React.PropTypes.func,
  triggerDelete: React.PropTypes.func,
  userStore: React.PropTypes.object,
  prepareButtons: React.PropTypes.func,
  displaytype: React.PropTypes.string,
  imageStore: React.PropTypes.object,
  triggerSaveToLibraryRemoveFromList: React.PropTypes.func,
  saveToLibRemoveFromList: React.PropTypes.func
};

export default inject('userStore','imageStore')(observer(ImageComponent));
