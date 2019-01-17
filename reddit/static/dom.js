const messageContainer = document.getElementById('messages');
const buttonpost = document.getElementsByClassName('button')[0];
const buttonedit = document.getElementsByClassName('button')[1];
const editform = document.getElementsByClassName('form')[1];
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
    HTMLString += '<span>title: </span>';
    HTMLString += '<span class="title" id="msgtitle' + data[i].id + '">' + data[i].title + ' </span>';
    HTMLString += '<a class="delete fas fa-trash-alt"" name="' + data[i].id + '"></a>';
    HTMLString += '<a class="edit fas fa-edit"" name="' + data[i].id + '"></a>';
    HTMLString += '<a class="downvote fa fa-minus" name="' + data[i].id + '"></a>';
    HTMLString += '<a class="upvote fas fa-plus"" name="' + data[i].id + '"></a>';
    HTMLString += '<span class="score">' + data[i].score + '</span>';
    HTMLString += '<span>url: </span>';
    HTMLString += '<span class="url"  id="msgurl' + data[i].id + '">' + data[i].url + ' </span>';
    HTMLString += '<span class="time"> posted at: ' + data[i].timestamp + ' </span>';
    HTMLString += '</div>';
  }
  messageContainer.insertAdjacentHTML('beforeend', HTMLString);
};

buttonpost.onclick = () => {
  const title = document.getElementsByClassName('formtitle')[0];
  const url = document.getElementsByClassName('formurl')[0];
  if(title.value == '' || url.value =='') {
    alert('You are missing title, url or both. Pls fill in normally.');
  } else {
    createMessage(title.value, url.value);
    title.value = '';
    url.value = '';
    ajax();
  }
};

buttonedit.onclick = () => {
  const title = document.getElementsByClassName('formtitle')[1];
  const url = document.getElementsByClassName('formurl')[1];
  const id = editform.id;
  if(title.value == '' || url.value =='') {
    alert('You are missing title, url or both. Pls fill in normally.');
  } else {
    editMessage(id, title.value, url.value);
    editform.id = '';
    editform.classList.add('hidden');
    title.value = '';
    url.value = '';
    ajax();
  }
};

function edit() {
  const edits = document.getElementsByClassName('edit');
  const title = document.getElementsByClassName('formtitle')[1];
  const url = document.getElementsByClassName('formurl')[1];

  for(let i = 0; i < edits.length; i++) {
    edits[i].onclick = () => {
      title.value = document.getElementById('msgtitle' + (edits[i].name)).textContent;
      url.value = document.getElementById('msgurl' + (edits[i].name)).textContent;
      editform.classList.remove('hidden');
      editform.id = edits[i].name;
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

function editMessage(id, title, url) {
  fetch(`http://localhost:8080/api/posts/${id}/edit`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"title": "' + title + '","url": "' + url + '"}',
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
