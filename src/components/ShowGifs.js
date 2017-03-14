import React from 'react';
import ImageComponent from './ImageComponent';
import {Col} from 'react-bootstrap';

export default function ShowGifs(props) {

   let images = props.gifs.map(function(img) {

      return (
       <ImageComponent key={img._id} img={img}
       addNewImage={props.addNewImage} prepareDeleteButton={props.prepareDeleteButton}
       handleSubmit={props.handleSubmit} handleDelete={props.handleDelete} addButton={props.addButton}/>
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
   deleteButton: React.PropTypes.bool,
   prepareDeleteButton: React.PropTypes.func
  };
