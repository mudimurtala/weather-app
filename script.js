document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
    getSoilInfo(city);
});

function getWeather(city) {
    const apiKey = '135726edf66e6dab84415856e97f5e1a';  // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('City not found');
        return;
    }

    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function getSoilInfo(city) {
    // Assuming you have a soil information API similar to the weather API
    const soilApiUrl = `https://api.example.com/soil?city=${city}`;

    fetch(soilApiUrl)
        .then(response => response.json())
        .then(data => displaySoilInfo(data))
        .catch(error => console.error('Error fetching the soil data:', error));
}

function displaySoilInfo(data) {
    const soilResult = document.getElementById('soil-result');
    soilResult.innerHTML = `
        <h2>Soil Information</h2>
        <p>Soil Type: ${data.soilType}</p>
        <p>Soil pH: ${data.ph}</p>
        <p>Nutrient Levels: ${data.nutrients}</p>
    `;
}
