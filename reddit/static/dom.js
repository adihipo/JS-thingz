const messageContainer = document.getElementById('messages');
const ourRequest = new XMLHttpRequest();

const ajax = () => {
  ourRequest.open('GET', 'http://localhost:8080/api/posts', true);
  ourRequest.onload = function() {
    const ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
    vote();
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
    HTMLString += '<a class="upvote fas fa-plus"" id="' + data[i].id + '"></a>';
    HTMLString += '<span class="score"> score: ' + data[i].score + ' </span>';
    HTMLString += '<a class="downvote fa fa-minus" id="' + data[i].id + '"></a>';
    HTMLString += '<span class="time"> posted at: ' + data[i].timestamp + ' </span>';
    HTMLString += '</div>';
  }
  messageContainer.insertAdjacentHTML('beforeend', HTMLString);
};

function vote() {
  const upvotes = document.getElementsByClassName('upvote');
  const downvotes = document.getElementsByClassName('downvote');

  for(let i = 0; i < upvotes.length; i++) {
    upvotes[i].onclick = () => {
      upVote(upvotes[i].id);
      ajax();
    };
  };

  for(let i = 0; i < downvotes.length; i++) {
    downvotes[i].onclick = () => {
      downVote(downvotes[i].id);
      ajax();
    };
  };
}

function upVote(id) {
  fetch(`http://localhost:8080/api/posts/${id}/upvote`, {
    method: 'put',
  }).then((resp) => (resp.body));
};

function downVote(id) {
  fetch(`http://localhost:8080/api/posts/${id}/downvote`, {
    method: 'put',
  }).then((resp) => (resp.body));
};