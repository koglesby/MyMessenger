const express = require('express');

const app = express();

// Middleware

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
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
