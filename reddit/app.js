const express = require('express');
const app = express();
const controller = require('./controller');
const PORT = 8080;

controller(app);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});