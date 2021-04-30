const body = document.querySelector("body");

const IMAGE_NUMBER = 5;

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `./images/${imageNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genNumber() {
  number = Math.floor(Math.random() * IMAGE_NUMBER);
  return number;
}

function init() {
  randomNumber = genNumber();
  paintImage(randomNumber);
}

init();
