const apikey = "d68ecd4325836c45dac1ad67163b1360";

const weatherData = document.getElementById("weather-data");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    console.log(cityValue);

    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        // Request to OpenWeather API, we have to wait for data to come in
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)} °`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" /> `;

        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherData.querySelector(".description").textContent = description;

        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div> ${detail} </div>`).join("");
    } 
    catch (error) {

        weatherData.querySelector(".icon").innerHTML =  "";

        weatherData.querySelector(".temperature").textContent = "";

        weatherData.querySelector(".description").textContent = "An error happened, please check your spelling!";

        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<d> ${detail} </d iv>`).join("");
        
    }
}