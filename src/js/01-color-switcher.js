const buttonStart = document.querySelector('[data-start]');

const buttonStop = document.querySelector('[data-stop]');

const body = document.querySelector('body');
let timerId = null;

function setButtonStates(startDisabled, stopDisabled) {
  buttonStart.disabled = startDisabled;
  buttonStop.disabled = stopDisabled;
}

setButtonStates(false, true);

buttonStart.addEventListener('click', () => {
  body.style.backgroundColor = getRandomHexColor();
  setButtonStates(true, false); 
  timerId = setInterval(onButtonStart, 1000);
});

function onButtonStart() {
  body.style.backgroundColor = getRandomHexColor();
}

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  setButtonStates(false, true); 
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}