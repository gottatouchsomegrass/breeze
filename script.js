document.addEventListener("DOMContentLoaded", () => {
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weatherIcon");
  let searchbtn = document.querySelector("#searchButton");
  let searchinpt = document.querySelector("#searchInput");
  let humidity = document.querySelector("#humidityVal");
  let wind = document.querySelector("#windSpeedVal");
  let ftemp = document.querySelector("#feelsLikeTemp");
  let pressure = document.querySelector("#pressureVal");
  let desc = document.querySelector("#weatherDesc");

  const previousCity = localStorage.getItem("city2");
  if (previousCity) {
    getWeather(previousCity);
  }

  searchbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const city1 = searchinpt.value.trim();
    localStorage.setItem("city2", city1);
    getWeather(city1);
  });

  async function getWeather(city1) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=5f6286feac037c1252791f5cc8aaaf07&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    try {
      const weatherData = await response.json();
      console.log(weatherData);
      let weatherIcon = weatherData.weather[0].icon;
      city.innerHTML = weatherData.name;
      temp.innerHTML = weatherData.main.temp + "°C";
      date.innerHTML = new Date().toDateString();
      humidity.innerHTML = weatherData.main.humidity + " %";
      wind.innerHTML = weatherData.wind.speed + " m/s";
      ftemp.innerHTML = weatherData.main.feels_like + " °C";
      pressure.innerHTML = weatherData.main.pressure + " hPa";
      desc.innerHTML = weatherData.weather[0].main;
      icon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } catch (err) {
      alert("City not found");
    }
  }
});
