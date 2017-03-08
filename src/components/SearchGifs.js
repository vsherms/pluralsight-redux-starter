import React from 'react';

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

  handleNewGif(event) {
    event.preventDefault();
    console.log("We got a new gif " +
      this.state.name + ":" + this.state.description + ":" + this.state.url);
    //this.props.addNewImage(newImage);
  }

  render() {
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
  }
}

export default SearchGifs;
