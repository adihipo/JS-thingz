const messageContainer = document.getElementById('messages');
const upvotes = document.getElementsByClassName('upvote');
const downvotes = document.getElementsByClassName('downvote');
const ourRequest = new XMLHttpRequest();

const ajax = () => {
  ourRequest.open('GET', 'http://localhost:8080/api/posts', true);
  ourRequest.onload = function() {
    const ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
}

ajax();
setInterval(() => {
  ajax();
}, 5000);

function renderHTML(data) {
  messageContainer.innerHTML = '';
  var HTMLString = "";
  for(let i = 0; i < data.length; i++) {
    HTMLString += '<div class="message">';
    HTMLString += '<span class="title"> title: ' + data[i].title + ' </span>';
    HTMLString += '<span class="url"> url: ' + data[i].url + ' </span>';
    HTMLString += '<a class="upvote" id="' + data[i].id + '">+</a>';
    HTMLString += '<span class="score"> score: ' + data[i].score + ' </span>';
    HTMLString += '<a class="downvote" id="' + data[i].id + '">-</a>';
    HTMLString += '<span class="time"> posted at: ' + data[i].timestamp + ' </span>';
    HTMLString += '</div>';
  }
  messageContainer.insertAdjacentHTML('beforeend', HTMLString);
};