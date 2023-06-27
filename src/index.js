function formatTime(timestamp, timezoneOffset) {
    let time = new Date(timestamp * 1000);
    let localTime = new Date(time.getTime() + timezoneOffset * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let day = days[localTime.getUTCDay()];
    let date = localTime.getUTCDate();
    let year = localTime.getUTCFullYear();
    let month = months[localTime.getUTCMonth()];
    let hours = localTime.getUTCHours().toString().padStart(2, "0");
    let minutes = localTime.getUTCMinutes().toString().padStart(2, "0");

    return `${day} ${date} ${month} ${year} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;

    timeElement.innerHTML = formatTime(response.data.dt, response.data.timezone);
}

function search(city) {
    let apiKey = "3980a7c8f2a782241a093131b099f993";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();
    let textInputElement = document.querySelector("#text-input");
    search(textInputElement.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = parseInt(temperatureElement.textContent, 10);
  let fahrenheit = Math.round((temperature * 9) / 5 + 32);
  temperatureElement.textContent = fahrenheit;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = parseInt(temperatureElement.textContent, 10);
  let celsius = Math.round(((temperature - 32) * 5) / 9);
  temperatureElement.textContent = celsius;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


let form = document.querySelector("#text-form");
form.addEventListener("submit", handleSubmit);


search("Honolulu");