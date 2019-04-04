const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testCredentials = require('../testCredentials');

const postsRoutes = require('./routes/posts');

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

app.use('/api/posts', postsRoutes);

module.exports = app;
