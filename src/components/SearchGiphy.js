import React from 'react';
import ShowGifs from './ShowGifs';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Button, Glyphicon } from 'react-bootstrap';

class SearchGiphy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      foundImages: [],
      randomize: false
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAndRemoveImage = this.addAndRemoveImage.bind(this);
    this.handleRandomize = this.handleRandomize.bind(this);
    this.addButton = this.addButton.bind(this);
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleRandomize(e){
    this.setState({randomize: e.target.checked});
  }

  handleSubmit(event) {
    event.preventDefault();
    let randomOffset = 0;
    if(this.state.randomize){
      randomOffset = Math.floor(Math.random() * 100);
    }
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=dc6zaTOxFJmzC&limit=6&offset=${randomOffset}`)
       .then(result => result.json())
       .then(data => this.setState({
         foundImages: this.convertToShowGifs(this.state.keyword, data.data, this.props.userStore.userId)}));
  }

  convertToShowGifs(keyword, foundImages, userId) {
    console.log(userId);
    return foundImages.map(image => ({
      _id: image.id,
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug,
      userId: userId
    }));
  }

  addButton(img){
    return (
      <Button style={{width: '280px', marginBottom: '10px'}} onClick={this.addOurImage} bsStyle="success" Glyphicon glyph="plus-sign" block>Add To Library</Button>
    );
  }

  addAndRemoveImage(img){
    this.props.imageStore.addNewImage(img);
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
            <span className="randomize"><input type="checkbox" name="randomize1" value="randomize" onChange={this.handleRandomize}/> Randomize search results</span>
         </form>
         <Grid>
           <Row>
             <ShowGifs addNewImage={this.addAndRemoveImage} handleDelete={this.props.imageStore.handleDelete}
             gifs={this.state.foundImages} handleSubmit={this.handleSubmit}/>
           </Row>
         </Grid>
      </div>
    );
  }
}

SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func,
  removeClickedImage: React.PropTypes.func,
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object,
  handleRandomize: React.PropTypes.func,
};



export default inject('imageStore', 'userStore')(observer(SearchGiphy));
