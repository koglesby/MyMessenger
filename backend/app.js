const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const testCredentials = require('../testCredentials');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb://" + testCredentials.username + ":" + testCredentials.password + "@ds221258.mlab.com:21258/mean-messenger-2").then(() => {
  console.log("connected to mongodb");
})
  .catch(() => {
    console.log("connection failed");
  });


// Middleware

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // .save() provided by mongoose
  post.save();
  console.log(post);
  res.status(201).json({ message: 'post added successfully' });
});

// only requests targeting /api/posts will reach this middleware
app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'bchufb32vae',
      title: 'first server side post',
      content: 'this post is coming from the server'
    },
    {
      id: 'bsdfafafffa',
      title: 'second server side post',
      content: 'this  second post is coming from the server'
    }
  ];
  res.status(200).json({
    message: 'posts sent succesfully',
    posts: posts
  });
});

module.exports = app;
