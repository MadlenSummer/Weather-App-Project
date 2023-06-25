function displayWeatherCondition(response) {
    console.log(response.data);

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.main.name;

    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);

    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    
}
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeatherCondition);



