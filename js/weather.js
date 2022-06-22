navigator.geolocation.getCurrentPosition(getCoordinates, errorHandling);
const defaultCity = "Stockholm";

function getCoordinates(position) {
  fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.edb81f0c3da10cab4bd7574d25e013b9&format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    document.querySelector(".weatherCity").innerHTML = myJson.address.town;
    getWeatherForToday(myJson.address.town);
  })
};

function getWeatherForToday(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a1ec32886627a2b874bbd5495988c71&units=metric`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    
    icon = mapWeatherIcon[myJson.weather[0].icon];
    desc = myJson.weather[0].description;
    wind = myJson.wind.speed;
    humidity = myJson.main.humidity;
    temperature = myJson.main.temp;

    weather = `<i class="fa-solid ${icon}"></i>`
    weather += `<span id="weatherInfo">
    <div>${desc}</div>
    <div class="wind"><i class="fa-solid fa-wind"></i><div>${wind}m/s</div></div>
    <div class="humidity"><i class="fa-solid fa-droplet"></i><div>${humidity}%</div></div>
    </span>`
    weather += `Temp: ${temperature.toFixed(1)}°C`;
    document.querySelector(".weather").innerHTML = weather;
  });
}

const mapWeatherIcon = {
  "01d": "fa-sun",
  "01n": "fa-moon",
  "02d": "fa-cloud-sun",
  "02n": "fa-cloud-moon",
  "03d": "fa-cloud-sun",
  "03n": "fa-cloud-moon",
  "04d": "fa-cloud-sun",
  "04n": "fa-cloud-moon",
  "09d": "fa-cloud-showers-heavy",
  "09n": "fa-cloud-showers-heavy",
  "10d": "fa-cloud-sun-rain",
  "10n": "fa-cloud-moon-rain",
  "11d": "fa-cloud-bolt",
  "11n": "fa-cloud-bolt",
  "13d": "fa-snowflake",
  "13n": "fa-snowflake",
  "50d": "fa-smog",
  "50n": "fa-smog"
};

function errorHandling(error) {
  getWeatherForToday(defaultCity);
  document.querySelector(".weatherCity").innerHTML = defaultCity;
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log(`"User denied the request for Geolocation, using default city '${defaultCity}'"`);
      break;
    case error.POSITION_UNAVAILABLE:
      console.log(`"Location information is unavailable, using default city '${defaultCity}'"`);
      break;
    case error.TIMEOUT:
      console.log(`"The request to get user location timed out, using default city '${defaultCity}'"`);
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}