var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

var pageCounter = 1;
btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json', false);
  ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
  pageCounter++;
  if(pageCounter > 3) {
    btn.classList.add("hide");
  }
});

function renderHTML(data) {
  var HTMLString = "";
  for(let i = 0; i < data.length; i++) {
    HTMLString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat " + data[i].foods.likes + " and doesnt like " + data[i].foods.dislikes + ".</p>";
  }
  animalContainer.insertAdjacentHTML('beforeend', HTMLString);
};

