const messageContainer = document.getElementById('messages');
const button = document.getElementById('button');
const ourRequest = new XMLHttpRequest();

const ajax = () => {
  ourRequest.open('GET', 'http://localhost:8080/api/posts', true);
  ourRequest.onload = function() {
    const ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
    vote();
    del();
    edit();
  };
  ourRequest.send();
}

ajax();
setInterval(() => {
  ajax();
}, 500);

function renderHTML(data) {
  messageContainer.innerHTML = '';
  var HTMLString = "";
  for(let i = 0; i < data.length; i++) {
    HTMLString += '<div class="message">';
    HTMLString += '<span class="title"> title: ' + data[i].title + ' </span>';
    HTMLString += '<span class="url"> url: ' + data[i].url + ' </span>';
    HTMLString += '<a class="upvote fas fa-plus"" name="' + data[i].id + '"></a>';
    HTMLString += '<span class="score"> score: ' + data[i].score + ' </span>';
    HTMLString += '<a class="downvote fa fa-minus" name="' + data[i].id + '"></a>';
    HTMLString += '<span class="time"> posted at: ' + data[i].timestamp + ' </span>';
    HTMLString += '<a class="delete fas fa-trash-alt"" name="' + data[i].id + '"></a>';
    HTMLString += '<a class="edit fas fa-edit"" name="' + data[i].id + '"></a>';
    HTMLString += '</div>';
  }
  messageContainer.insertAdjacentHTML('beforeend', HTMLString);
};

button.onclick = () => {
  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  createMessage(title, url);
};

function edit() {
  const edits = document.getElementsByClassName('edit');

  for(let i = 0; i < edits.length; i++) {
    edits[i].onclick = () => {
      editMessage(edits[i].name);
      ajax();
    };
  };
};

function del() {
  const deletes = document.getElementsByClassName('delete');

  for(let i = 0; i < deletes.length; i++) {
    deletes[i].onclick = () => {
      deleteMessage(deletes[i].name);
      ajax();
    };
  };
};

function vote() {
  const upvotes = document.getElementsByClassName('upvote');
  const downvotes = document.getElementsByClassName('downvote');

  for(let i = 0; i < upvotes.length; i++) {
    upvotes[i].onclick = () => {
      upVote(upvotes[i].name);
      ajax();
    };
  };

  for(let i = 0; i < downvotes.length; i++) {
    downvotes[i].onclick = () => {
      downVote(downvotes[i].name);
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

function deleteMessage(id) {
  fetch(`http://localhost:8080/api/posts/${id}/delete`, {
    method: 'delete',
  }).then((resp) => (resp.body));
};

function editMessage(id) {
  fetch(`http://localhost:8080/api/posts/${id}/edit`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"title": "test","url": "test"}',
  }).then((resp) => (resp.body));
};

function createMessage(title, url) {
  fetch(`http://localhost:8080/api/posts`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"title": "' + title + '","url": "' + url + '"}',
  }).then((resp) => (resp.body));
};
