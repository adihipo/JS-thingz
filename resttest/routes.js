const express = require('express');
const app = express();

app.get('/groot', (req, res) => {
  if(req.query.message) {
    res.status(200).json('{"received": "' + req.query.message + '","translated": "I am Groot!"}');
  } else {
    res.status(404).json('{"error": "I am Groot!"}');
  }
});

module.exports = app;