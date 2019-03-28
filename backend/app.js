const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testCredentials = require('../testCredentials');

const Post = require('./models/post');

const app = express();

mongoose
  .connect(
    'mongodb://' +
      testCredentials.username +
      ':' +
      testCredentials.password +
      '@ds221258.mlab.com:21258/mean-messenger-2'
  )
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('connection failed');
  });

// Middleware

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // .save() provided by mongoose
  post.save().then(savedPost => {
    res.status(201).json({
      message: 'post added successfully',
      postId: savedPost._id
    });
  });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update Successful' });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'posts sent succesfully',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'post deleted' });
  });
});

module.exports = app;
