var thumbnailContainer = document.getElementById("thumbnails");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://api.giphy.com/v1/gifs/search?q=bunny&api_key=GDMJo37Siab3efgi1pm83cjPomoystBR&limit=16', false);
ourRequest.onload = function() {
  var ourData = JSON.parse(ourRequest.responseText);
  renderHTML(ourData);
  enlargeIMG(ourData);
};
ourRequest.send();

function enlargeIMG(data) {
  thumbnailContainer.addEventListener('click', function() {
    var img = document.getElementsByTagName('img');
    for(let i = 0; i < img.length; i++) {
      img[i].onclick = () => {
        for(let j = 0; j < img.length; j++) {
          img[j].setAttribute('src', data.data[j].images.fixed_width_small_still.url);
          if(!img[j].classList.contains('thumbs')) {
            img[j].classList.add('thumbs');
          }
        }
        img[i].classList.remove('thumbs');
        img[i].setAttribute('src', data.data[i].images.original.url);
      }
    }
  });
};

function renderHTML(data) {
  var HTMLString = "";
  for(let i = 0; i < data.data.length; i++) {
    HTMLString += '<img class="thumbs" src="' + data.data[i].images.fixed_width_small_still.url + '">';
  }
  thumbnailContainer.insertAdjacentHTML('beforeend', HTMLString);
};
