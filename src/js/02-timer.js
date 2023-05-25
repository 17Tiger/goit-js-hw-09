import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const buttonStart = document.querySelector('button[data-start]');
buttonStart.disabled = true;

const daysTimer = document.querySelector('span[data-days]');

const hoursTimer = document.querySelector('span[data-hours]');

const minutesTimer = document.querySelector('span[data-minutes]');

const secondsTimer = document.querySelector('span[data-seconds]');

let timerId = null;
let selectedDate = null;

const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    selectedDate = selectedDates[0];
    console.log(selectedDate);

    if (Date.now() > selectedDate.getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      buttonStart.addEventListener('click', startTimer);

    }
  },
};

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  buttonStart.disabled = true;
}

function updateTimer() {

  const difference = selectedDate.getTime() - Date.now();

  if (difference < 1000) {

    clearInterval(timerId);
    secondsTimer.textContent = '00';
  } else {

    const { days, hours, minutes, seconds } = convertMs(difference);

    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minutesTimer.textContent = addLeadingZero(minutes);
    secondsTimer.textContent = addLeadingZero(seconds);

  }
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('input#datetime-picker', options);
