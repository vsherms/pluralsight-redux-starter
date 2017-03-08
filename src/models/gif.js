const mongoose = require('mongoose');
// var validators = require('mongoose-validators');

const GifSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String
  });


module.exports = mongoose.model('Gif', GifSchema);
