const mongoose = require('mongoose');
// var validators = require('mongoose-validators');

const GifSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String
  });


export default mongoose.model('Gif', GifSchema);
