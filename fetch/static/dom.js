'use strict'

const button = document.getElementById('button');
const container = document.getElementById('container');

const URL = 'http://api.icndb.com/jokes/random';

button.onclick = () => {
  fetch(URL)
  .then(response => response.json())
  .then(data => renderHTML(data))
};

function renderHTML(data) {
  var HTMLString = "";
  HTMLString += '<p>' + data.value.joke + '</p>';
  container.insertAdjacentHTML('beforeend', HTMLString);
};