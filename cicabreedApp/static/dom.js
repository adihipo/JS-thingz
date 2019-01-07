const breedButton = document.getElementById('breed');
const form = document.getElementsByClassName('form')[0];
const male = document.getElementById('male');
const female = document.getElementById('female');
const breedAgainButton = document.getElementById('breedagain');
const result = document.getElementsByClassName('result')[0];
const resultSentence = document.getElementById('resultsentence');
var numberOfKittens = 0;

breedButton.onclick = () => {
  result.classList.remove('hidden');
  numberOfKittens = parseInt(male.value) + parseInt(female.value) * 3;
  resultSentence.textContent = 'Wow you just bred ' + numberOfKittens + ' kittens!';
  form.classList.add('hidden');
};

breedAgainButton.onclick = () => {
  result.classList.add('hidden');
  form.classList.remove('hidden');
};

