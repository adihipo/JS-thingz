const express = require('express');
const controller = require('./controller');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

controller(app);

app.listen(PORT, () => {
  console.log('Listening to port');
});