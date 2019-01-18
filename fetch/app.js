'use strict'

const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});