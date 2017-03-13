import React from 'react';
import {Col, Image, Button, Glyphicon} from 'react-bootstrap';

class SoloImageWithButton extends React.Component {

  constructor() {
    super();
    this.addOurImage = this.addOurImage.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
  }

  addOurImage() {
    this.props.addNewImage(this.props.img);
  }

  triggerDelete(e){
    console.log(this.props.img._id);
    this.props.handleDelete(this.props.img._id);
  }

  render() {
    let ourButton = (
      <button onClick={this.addOurImage} type="submit"
       className="brn btn-primary">Add To My List</button>
    );
    let deleteButton = (
      <Button style={{width:'280px', marginBottom: '10px'}} onClick={this.triggerDelete} type="submit"
       className="brn btn-danger" block><Glyphicon glyph="remove-circle"/>Delete</Button>
    );

     const imageWellStyle = {maxWidth: 280, margin: '0px', padding:'0px'};

    return (

       <div className="text-center col-lg-3 col-md-4 col-sm-6" key={this.props.img.name}>
         <div style={imageWellStyle}>
           <Image height="280" width="280" src={this.props.img.url} rounded/>
           {this.props.addButton ? deleteButton : ourButton}
         </div>
       </div>

    );
  }
}

SoloImageWithButton.propTypes = {
  img: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  addButton: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  handleDelete: React.PropTypes.func,
  triggerDelete: React.PropTypes.func
};

export default SoloImageWithButton;
