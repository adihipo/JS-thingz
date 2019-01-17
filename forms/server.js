const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/signup', upload.array(), function (req, res, next) {
  res.render('response', {
    info : req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});