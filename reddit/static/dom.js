const messageContainer = document.getElementById('messages');

const ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:8080/api/posts', true);
ourRequest.onload = function() {
  const ourData = JSON.parse(ourRequest.responseText);
  renderHTML(ourData);
};
ourRequest.send();

function renderHTML(data) {
  console.log(data);
  var HTMLString = "";
  for(let i = 0; i < data.length; i++) {
    HTMLString += '<div class="message">';
    HTMLString += '<span class="title"> title: ' + data[i].title + ' </span>';
    HTMLString += '<span class="url"> url: ' + data[i].url + ' </span>';
    HTMLString += '<span class="score"> score: ' + data[i].score + ' </span>';
    HTMLString += '<span class="time"> posted at: ' + data[i].timestamp + ' </span>';
    HTMLString += '</div>';
  }
  messageContainer.insertAdjacentHTML('beforeend', HTMLString);
};