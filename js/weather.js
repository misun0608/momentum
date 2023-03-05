const API_KEY = "b7ce8ffafb253c1ae94bb652cc607721";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherContainer = document.querySelector(
        "#weather span:first-child"
      );
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weatherContainer.innerText = `${data.weather[0].main} / ${Math.round(
        data.main.temp
      )}°C`;
    });
}

function onGeoError() {
  alert("can't find it");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
