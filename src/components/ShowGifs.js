import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

ShowGifs.propTypes = {
  gifs: React.PropTypes.array,
  addNewImage: React.PropTypes.func.isRequired,
  addButton: React.PropTypes.bool,
  removeClickedImage: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  deleteButton: React.PropTypes.bool
};



export default function ShowGifs(props) {
  let images = props.gifs.map(function(img) {
    return (
      <SoloImageWithButton key={img._id} img={img}
      addNewImage={props.addNewImage} addButton={props.addButton}
      removeClickedImage={props.removeClickedImage}
      handleSubmit={props.handleSubmit} handleDelete={props.handleDelete} deleteButton={props.deleteButton}/>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}
