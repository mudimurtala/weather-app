document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '135726edf66e6dab84415856e97f5e1a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            const { lon, lat } = data.coord;
            getSoilData(lat, lon);
        })
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

function getSoilData(lat, lon) {
    const soilApiUrl = `https://api-test.openepi.io/soil/type?lon=${lon}&lat=${lat}`;
    const corsProxy = 'https://corsproxy.io/?';

    console.log('Fetching soil data from URL:', corsProxy + encodeURIComponent(soilApiUrl));

    fetch(corsProxy + encodeURIComponent(soilApiUrl))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Soil data received:', data);
            displaySoilData(data);
        })
        .catch(error => console.error('Error fetching the soil data:', error));
}

function displaySoilData(data) {
    const soilType = data.properties.most_probable_soil_type || 'N/A';
    const soilPH = data.properties.ph || 'N/A';
    const organicCarbon = data.properties.organic_carbon !== undefined ? data.properties.organic_carbon + '%' : 'N/A';

    const soilResult = document.getElementById('soil-result');
    soilResult.innerHTML = `
        <h2>Soil Information</h2>
        <p>Soil Type: ${soilType}</p>
        <p>Soil pH: ${soilPH}</p>
        <p>Organic Carbon: ${organicCarbon}</p>
    `;
}
