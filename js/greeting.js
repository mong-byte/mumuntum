const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-form_name");

const USER_LS = "user";
const SHOWING_CN = "showing";

function saveUser(text) {
  localStorage.setItem(USER_LS, text);
}

function paintUser(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Welcome, ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintUser(currentValue);
  saveUser(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const loadedName = localStorage.getItem(USER_LS);
  if (loadedName === null) {
    askForName();
  } else {
    paintUser(loadedName);
  }
}

function init() {
  loadName();
}

init();
