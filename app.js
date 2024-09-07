// app.js
const form = document.getElementById('weatherForm');
const weatherDisplay = document.getElementById('weatherDisplay');
const body = document.querySelector('body');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload
  const country = document.getElementById('country').value;
  getWeatherData(country);
});

async function getWeatherData(country) {
  const apiKey = '27fa452632a1cfd7a419949988ab8d8c'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
      changeBackground(data.weather[0].main); // Use the main weather condition
    } else {
      weatherDisplay.innerHTML = `<p>Country not found! Please try again.</p>`;
      weatherDisplay.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching the weather data:', error);
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherDisplay.innerHTML = `
    <p><strong>Country:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
  `;
  weatherDisplay.style.display = 'block';
}

function changeBackground(weatherCondition) {
  let backgroundImage = '';

  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      backgroundImage = 'url("images/sunny.jpg")'; // Use a sunny image
      break;
    case 'clouds':
      backgroundImage = 'url("images/cloudy.jpg")'; // Use a cloudy image
      break;
    case 'rain':
      backgroundImage = 'url("images/rainy.jpg")'; // Use a rainy image
      break;
    case 'snow':
      backgroundImage = 'url("images/snowy.jpg")'; // Use a snowy image
      break;
    case 'thunderstorm':
      backgroundImage = 'url("images/stormy.jpg")'; // Use a stormy image
      break;
    default:
      backgroundImage = 'url("images/default.jpg")'; // Default weather image
      break;
  }

  body.style.backgroundImage = backgroundImage;
}
