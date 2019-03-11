const express = require('express');

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.url);
  console.log('first middleware');

  next();
});

app.use((req, res, next) => {
  res.send('hello from express');
});

module.exports = app;
