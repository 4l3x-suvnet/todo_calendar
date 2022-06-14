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
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a1ec32886627a2b874bbd5495988c71`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    
    icon = myJson.weather[0].icon;
    temperature = myJson.main.temp;

    weather = `<img src="https://openweathermap.org/img/wn/${icon}.png">`
    weather += "Temp: " + (temperature - 273.15).toFixed(1) + "°C";
    document.querySelector(".weather").innerHTML += weather;
  });
}

navigator.geolocation.getCurrentPosition(getCoordinates);