import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
const bodyParser = require('body-parser');
const uriUtil = require('mongodb-uri');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('./authConfig');
const morgan = require('morgan');
const apiRoutes = express.Router();
const hash = require('password-hash');


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

const app = express();

app.set('superSecret', authConfig.secret);


/* eslint-disable no-console */



const compiler = webpack(config);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(morgan('dev'));

app.post('/newuser', function(req, res) {
  let user = new User({
    username: req.body.username,
    password: hash.generate(req.body.password)
  });

  user.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true});
  });
});

apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.'});
    } else if(user) {
      console.log(req.body.username, req.body.password, user);

      if (!hash.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Incorrect password.'});
      } else {

        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

apiRoutes.use(function(req,res,next) {
   let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {

    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if(err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {

        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/', function(req,res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});
//>>>>>>>>>>>>>>>>>



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

app.use('/api', apiRoutes);

const port = 3000;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
