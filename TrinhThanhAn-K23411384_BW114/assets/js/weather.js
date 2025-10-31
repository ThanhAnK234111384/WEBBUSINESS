const select = document.getElementById('province-select');

// Populate select with provinces
provinceData.forEach(province => {
    const option = document.createElement('option');
    option.value = province.value;
    option.textContent = province.name;
    select.appendChild(option);
});

// Handle province selection
select.addEventListener('change', function() {
    const value = this.value;
    if (value) {
        fetchWeather(value);
    } else {
        document.getElementById('weather-display').style.display = 'none';
    }
});

async function fetchWeather(value) {
    try {
        const response = await fetch(`https://api.allorigins.win/raw?url=https://utils3.cnnd.vn/ajax/weatherinfo/${value}.htm`);
        const data = await response.json();
        if (data.Data.success) {
            displayWeather(data.Data.data.datainfo);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(info) {
    document.getElementById('location').textContent = info.location;
    document.getElementById('temperature').textContent = `${info.temperature}°C`;
    document.getElementById('status').textContent = info.status;
    document.getElementById('high').textContent = info.high;
    document.getElementById('low').textContent = info.low;
    document.getElementById('feels-like').textContent = info.feels_like;
    document.getElementById('humidity').textContent = info.humidity;
    document.getElementById('visibility').textContent = `${info.visibility.index} ${info.visibility.unit}`;
    document.getElementById('uv-index').textContent = `${info.UV_index.index} (${info.UV_index.status})`;
    document.getElementById('wind').textContent = `${info.wind.index} ${info.wind.unit}`;
    document.getElementById('sunrise').textContent = info.sunrise;
    document.getElementById('sunset').textContent = info.sunset;
    document.getElementById('current-icon').src = info.shadow_icon;

    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
    info.forecast.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <p>${day.date}</p>
            <img src="${day.shadow_icon}" alt="Forecast Icon" class="forecast-icon">
            <p>${day.high}°/${day.low}°</p>
            <p>${day.status}</p>
        `;
        forecastDiv.appendChild(dayDiv);
    });

    document.getElementById('weather-display').style.display = 'block';
}
