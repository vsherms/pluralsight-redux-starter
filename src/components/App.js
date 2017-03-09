import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';


let testGifs = [

];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      images: []
    };
    this.addNewImage = this.addNewImage.bind(this);
    this.loadGifsFromServer = this.loadGifsFromServer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
      let allImages = this.state.images.slice();
      allImages.push(image);
      this.setState({images: allImages});
    });
  }

  handleDelete(imgId) {
    console.log(this.state.images);
    let newList = this.state.images.filter(img => img._id !== imgId);
    this.setState({images: newList});
    fetch('/gifs/' + imgId, {
      method: 'DELETE'
    });
  }


  render() {
    return (
      <div>
        <h1>My Giphy Wonderland</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/searchgiphy">Search Giphy</Link></li>
          <li><Link to="/showgifs">Show Gifs</Link></li>
          <li><Link to="/addgifs">Add More Gifs</Link></li>
        </ul>
        {this.props.children || "<Home/>"}
      </div>
    );
  }
}

export default App;
