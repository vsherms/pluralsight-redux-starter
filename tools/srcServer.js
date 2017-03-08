import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
const bodyParser = require('body-parser');
const uriUtil = require('mongodb-uri');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import Gif from '../models/gif';

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gifs';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);





/* eslint-disable no-console */


const app = express();
const compiler = webpack(config);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.post('/gifs',function(req, res){

  let gif = new Gif();

  gif.name = req.body.name;
  gif.url  = req.body.url;
  gif.description = req.body.description;
  gif.save(function(err, gif){
    if(err){
      res.send(err);
    } else {
      res.json(gif);
    }
  });
});


app.get('/gifs', function(req, res, next){
Gif.find(function(err, gifs){
    if(err){
      next(err);
    } else {
      res.json(gifs);
    }
  });
});

app.delete('/gifs/:gif_id', function(req, res){
  Gif.remove({_id: req.params.gif_id}, function(err, gif){
    if(err){
      console.log(err);
    } else {
      res.json({title: 'Gif was successfully deleted!'});
    }
  });
});


app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

const port = 3000;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
