function getWeatherForToday() {
    const city = 'Borås';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a1ec32886627a2b874bbd5495988c71`)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      
      icon = myJson.weather[0].icon;
      weather = `<img src="https://openweathermap.org/img/wn/${icon}.png">`
      weather += (myJson.main.temp - 273.15).toFixed(1) + "°C";
      document.querySelector(".weather").innerHTML = weather;
    });
  }

  getWeatherForToday();