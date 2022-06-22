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
    
    const icon = mapWeatherIcon[myJson.weather[0].icon];

    const desc = document.createElement('div');
    desc.innerHTML = myJson.weather[0].description;
    // Should be in descContainer
    const wind = document.createElement('div');
    wind.innerHTML = myJson.wind.speed + "m/s";
    const humidity = document.createElement('div');
    humidity.innerHTML = myJson.main.humidity + "%";

    const temperature = myJson.main.temp;
    // Should be in tempContainer
    const minTemp = document.createElement('div');
    minTemp.innerHTML = myJson.main.temp_min + "°C";
    const maxTemp = document.createElement('div');
    maxTemp.innerHTML = myJson.main.temp_max + "°C";

    const container = document.querySelector(".weather");
    const iconContainer = document.createElement('i');
    const descContainer = document.createElement('div');
    const windContainer = document.createElement('div');
    const windIcon = document.createElement('i');
    const humidityContainer = document.createElement('div');
    const humidityIcon = document.createElement('i');
    
    const tempContainer = document.createElement('div');
    const degree = document.createElement("i");
    const celsius = document.createElement("i");
    const otherTempsContainer = document.createElement('div');
    const minTempIcon = document.createElement('i');
    const minTempContainer = document.createElement('div');
    const maxTempContainer = document.createElement('div');
    const maxTempIcon = document.createElement('i');

    iconContainer.classList.add("weatherIcon", "fa-solid", `${icon}`);
    
    descContainer.id = "weatherInfo";
    otherTempsContainer.id = "tempInfo";
    
    windContainer.classList.add("d-flex", "justify-space-between");
    windIcon.classList.add("fa-solid", "fa-wind");
    
    humidityContainer.classList.add("d-flex", "justify-space-between");
    humidityIcon.classList.add("fa-solid", "fa-droplet");
    
    tempContainer.classList.add("tempIcons");
    degree.classList.add("fa-solid", "fa-circle-dot");
    celsius.classList.add("fa-solid", "fa-c");
    
    minTempContainer.classList.add("d-flex", "justify-space-between");
    minTempIcon.classList.add("fa-solid", "fa-temperature-low");

    maxTempContainer.classList.add("d-flex", "justify-space-between");
    maxTempIcon.classList.add("fa-solid", "fa-temperature-high");

    // Converts temp string to font-awesome icons
    for (let index = 0; index < temperature.toFixed(1).length; index++) {
      const newIcon = document.createElement('i');
      newIcon.classList.add("fa-solid")
      newIcon.classList.add(`${mapTemperature[temperature.toFixed(1)[index]]}`)
      tempContainer.append(newIcon);
    }

    tempContainer.append(degree, celsius);
    minTempContainer.append(minTempIcon, minTemp);
    maxTempContainer.append(maxTempIcon, maxTemp);
    otherTempsContainer.append(minTempContainer, maxTempContainer)
    
    descContainer.append(desc);
    windContainer.append(windIcon, wind);
    descContainer.append(windContainer);
    
    humidityContainer.append(humidityIcon, humidity);
    descContainer.append(humidityContainer);
    
    container.append(iconContainer, descContainer, tempContainer, otherTempsContainer);
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

const mapTemperature = {
  "-": "fa-minus",
  "0": "fa-0",
  "1": "fa-1",
  "2": "fa-2",
  "3": "fa-3",
  "4": "fa-4",
  "5": "fa-5",
  "6": "fa-6",
  "7": "fa-7",
  "8": "fa-8",
  "9": "fa-9",
  ".": "fa-circle",
}

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