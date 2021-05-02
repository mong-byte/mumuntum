const weatherContainer = document.querySelector(".weather-container");
const weather = document.querySelector(".js-weather");
const API_KEY = "1e0082509ff1a0b80841d880c3f99028";

const COORDS_LS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = json.main.temp;
      const location = json.name;
      const icon = json.weather[0].icon;
      const iconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      weather.innerHTML = `${temperature}˚C <i class="fas fa-paw"></i> ${location}`;
      const img = document.createElement("img");
      img.setAttribute("src", iconSrc);
      weatherContainer.appendChild(img);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access your location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (!loadedCoords) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
