import React from 'react';

class SoloImageWithButton extends React.Component {

  constructor() {
    super();
    this.addOurImage = this.addOurImage.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.addNewImage = this.addNewImage.bind(this);
  }



  addOurImage() {
    this.addNewImage(this.props.img);
    this.props.removeClickedImage(this.props.img);
  }
  triggerDelete(e){
    console.log(this.props.img._id);
    this.props.handleDelete(this.props.img._id);
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
    });
  }

  render() {
    let ourButton = (
      <button onClick={this.addOurImage} type="submit"
       className="brn btn-primary">Add To My List</button>
    );
    let deleteButton = (
      <button onClick={this.triggerDelete} type="submit"
       className="brn btn-danger">Delete</button>
    );


    return (
       <div key={this.props.img.name}>
         <img src={this.props.img.url}></img>
         {this.props.addButton ? deleteButton : ourButton}
         <h3>{this.props.img.description}</h3>
       </div>

    );
  }
}

SoloImageWithButton.propTypes = {
  img: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  addButton: React.PropTypes.bool,
  removeClickedImage: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  handleDelete: React.PropTypes.func,
  triggerDelete: React.PropTypes.func
};

export default SoloImageWithButton;
