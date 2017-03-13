import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';
import {Col} from 'react-bootstrap';

export default function ShowGifs(props) {
   let images = props.gifs.map(function(img) {
      return (
       <SoloImageWithButton key={img._id} img={img}
       addNewImage={props.addNewImage} addButton={props.addButton}
       handleSubmit={props.handleSubmit} handleDelete={props.handleDelete} deleteButton={props.deleteButton}/>
     );});

     return (
       <div>
       {images}
       </div>
     );
 }

 ShowGifs.propTypes = {
   gifs: React.PropTypes.array,
   addNewImage: React.PropTypes.func,
   addButton: React.PropTypes.bool,
   handleSubmit: React.PropTypes.func,
   handleDelete: React.PropTypes.func,
   deleteButton: React.PropTypes.bool
  };
