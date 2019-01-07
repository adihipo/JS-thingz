const breedButton = document.getElementById('breed');
const form = document.getElementsByClassName('form')[0];
const male = document.getElementById('male');
const downmale = document.getElementById('downmale');
const upmale = document.getElementById('upmale');
const female = document.getElementById('female');
const downfemale = document.getElementById('downfemale');
const upfemale = document.getElementById('upfemale');
const breedAgainButton = document.getElementById('breedagain');
const result = document.getElementsByClassName('result')[0];
const gifs = document.getElementById('gifs');
const resultSentence = document.getElementById('resultsentence');
var numberOfKittens = 0;

downmale.onclick = () => {
  male.value--;
};

upmale.onclick = () => {
  male.value++;
};

downfemale.onclick = () => {
  female.value--;
};

upfemale.onclick = () => {
  female.value++;
};

breedButton.onclick = () => {
  var males = parseInt(male.value);
  console.log(males);
  var females = parseInt(female.value);
  if(!isNaN(males) && !isNaN(females)) {
    result.classList.remove('hidden');
    if(males <= 0 || females <= 0) {
      numberOfKittens = 0;
    } else {
      numberOfKittens = males + females * 2;
      renderHTML(numberOfKittens);
    }
    resultSentence.textContent = 'Wow you just bred ' + numberOfKittens + ' kittens!';
    form.classList.add('hidden');
  }
};

function renderHTML(numberOfKittens) {
  var HTMLString = "";
  for(let i = 0; i < numberOfKittens; i++) {
    HTMLString += '<img class="kittens" src="/static/kitten.gif" width="7%"></img>';
  }
  gifs.insertAdjacentHTML('beforeend', HTMLString);
};

breedAgainButton.onclick = () => {
  gifs.innerHTML = '';
  result.classList.add('hidden');
  form.classList.remove('hidden');
};

