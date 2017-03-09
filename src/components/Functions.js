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


removeClickedImage(img) {
  let filArr = this.state.foundImages.filter(function(x){return x.name !== img.name;});
  this.setState({foundImages: filArr});
}


triggerDelete(e){
  console.log(this.props.img._id);
  this.props.handleDelete(this.props.img._id);
}

ShowGifs.propTypes = {
  gifs: React.PropTypes.array,
  addNewImage: React.PropTypes.func.isRequired,
  addButton: React.PropTypes.bool,
  removeClickedImage: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  deleteButton: React.PropTypes.bool
};


handleDelete(imgId) {
  console.log(this.state.images);
  let newList = this.state.images.filter(img => img._id !== imgId);
  this.setState({images: newList});
  fetch('/gifs/' + imgId, {
    method: 'DELETE'
  });
}

triggerDelete(e){
  console.log(this.props.img._id);
  this.handleDelete(this.state.img._id);

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
