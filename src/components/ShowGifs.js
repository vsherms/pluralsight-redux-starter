import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

export default class ShowGifs extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
    this.loadGifsFromServer = this.loadGifsFromServer.bind(this);
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

  handleDelete(id) {
    let newList = this.state.images.filter(img => img._id !== id);
    this.setState({images: newList});
    fetch('/gifs/' + id, {
      method: 'DELETE'
    });
  }

  render() {
    let deleteButton = (
      <button onClick={this.handleDelete} type="submit"
       className="brn btn-danger">Delete</button>
    );

   let image = this.state.images.map(function(img){
     return(
       <div key={img.name} id={img._id}>
         <img src={img.url}></img>
         {deleteButton}
         <h3>{img.description}</h3>

       </div>
   );});

    return (
      <div>
        {image}
      </div>
    );
  }
}
