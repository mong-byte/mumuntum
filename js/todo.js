const toDoForm = document.querySelector(".js-todo_form");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".pending-list");
const finishedList = document.querySelector(".finished-list");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pending = [];
let finished = [];

function moveToPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const moveToPendingArr = finished.filter((todo) => {
    return todo.id === parseInt(li.id);
  });
  const toPending = moveToPendingArr[0].text;
  paintPending(toPending);
  const cleanToDos = finished.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveFinished();
}

function moveToFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const moveToFinishedArr = pending.filter((todo) => {
    return todo.id === parseInt(li.id);
  });
  const toFinished = moveToFinishedArr[0].text;
  paintFinished(toFinished);
  const cleanToDos = pending.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  pending = cleanToDos;
  savePending();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finished.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveFinished();
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pending.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  pending = cleanToDos;
  savePending();
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const passBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  delBtn.innerText = "Done";
  passBtn.innerText = "Back";
  delBtn.addEventListener("click", deleteFinished);
  passBtn.addEventListener("click", moveToPending);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(passBtn);
  li.appendChild(span);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId,
  };
  finished.push(finishedObj);
  saveFinished();
}

function paintPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pending.length + 1;
  delBtn.innerText = "Delete";
  checkBtn.innerText = "Done";
  delBtn.addEventListener("click", deletePending);
  checkBtn.addEventListener("click", moveToFinished);
  span.innerHTML = text;
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.appendChild(span);
  li.id = newId;
  pendingList.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId,
  };
  pending.push(pendingObj);
  savePending();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach((todo) => {
      paintPending(todo.text);
    });
  }
  if (loadedFinished) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach((todo) => {
      paintFinished(todo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
