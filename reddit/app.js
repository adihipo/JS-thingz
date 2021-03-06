const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./controller');
const PORT = 8080;

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));
app.use(bodyParser.json());

controller(app);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});