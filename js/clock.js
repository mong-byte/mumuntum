const clockContainer = document.querySelector(".js-clock");
const jsclock = clockContainer.querySelector("h4");
const jsSeconds = clockContainer.querySelector("h5");

function loadClock() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  jsclock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  jsSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  loadClock();
  setInterval(loadClock, 1000);
}

init();
