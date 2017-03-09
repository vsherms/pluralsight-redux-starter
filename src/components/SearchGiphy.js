import React from 'react';
import ShowGifs from './ShowGifs';

class SearchGiphy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      foundImages: [],
      images: []
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeClickedImage = this.removeClickedImage.bind(this);
    this.addNewImage = this.addNewImage.bind(this);
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

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=dc6zaTOxFJmzC&limit=6`)
       .then(result => result.json())
       .then(data => this.setState({
         foundImages: this.convertToShowGifs(this.state.keyword, data.data)}));
  }

  convertToShowGifs(keyword, foundImages) {
    return foundImages.map(image => ({
      _id: image.id,
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug
    }));
  }

  removeClickedImage(img) {
    let filArr = this.state.foundImages.filter(function(x){return x.name !== img.name;});
    this.setState({foundImages: filArr});
  }

  render() {
    return (
      <div>
        <form method="" role="form">
            <legend>Search Giphy</legend>

            <div className="form-group">
              <input onChange={this.handleKeywordChange} value={this.state.keyword} type="text" className="form-control" id="keyword" placeholder="keyword"/>
            </div>

            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
         </form>
         <ShowGifs addNewImage={this.addNewImage} removeClickedImage={this.removeClickedImage}
           gifs={this.state.foundImages} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func,
  removeClickedImage: React.PropTypes.func
};



export default SearchGiphy;
