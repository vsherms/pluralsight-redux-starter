import React from 'react';
import { observer, inject } from 'mobx-react';

class SearchGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      url: "",
      description: ""
    };
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value});
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
    .then(result => result.json());
  }

  handleNewGif(event) {
    event.preventDefault();
    let image = {name: this.state.name, url: this.state.url, description: this.state.description};
    this.addNewImage(image);
    console.log("We got a new gif " +
      this.state.name + ":" + this.state.description + ":" + this.state.url);
    //this.props.addNewImage(newImage);
  }

  render() {
    if(this.props.userStore.isLoggedIn) {

    return (
      <form method="" role="form">
          <legend>Add New Gif</legend>

          <div className="form-group">
            <input onChange={this.handleNameChange.bind(this)} value={this.state.name} type="text" className="form-control" id="keyword" placeholder="keyword"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleUrlChange.bind(this)} value={this.state.url}type="text" className="form-control" id="url" placeholder="url"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleDescriptionChange.bind(this)} value={this.state.description} type="text" className="form-control" id="description" placeholder="description"/>
          </div>

          <button onClick={this.handleNewGif.bind(this)} type="submit" className="btn btn-primary">Submit</button>
       </form>
    );
    }else{
      return (
      <div>
        Log In To Add More Gifs!!!!!
      </div>
    );
  }
  }
}

SearchGifs.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(SearchGifs));
