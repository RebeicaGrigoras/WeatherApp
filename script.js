let now = new Date();
let h5 = document.querySelector("h5");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h5.innerHTML = `${day}  ${hour}:${minutes}`;
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${temp}ºC`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let min = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `${min}ºC`;

  let max = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `${max}ºC`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
function search(event) {
  event.preventDefault();
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

//
function searchLocation(position) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
