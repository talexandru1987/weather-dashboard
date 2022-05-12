const API_KEY = "652867178169694693f42b9870238545";
const recentCitiesContainer = $("#recent-cities");
const currentAndFutureData = $("#render-data-container");

const renderCities = () => {
  // get recent cities from LS []
  const recentSearches = readLocalStorage("recentSearches", []);
  // if [] is empty then render alert
  if (recentSearches.length === 0) {
    //render alert
    const alert = `<div class="recent-cities-alert btn"><p>No Past Searches!</p></div>`;
  }
  // else render all recent cities
  // add an event listener on div containing all cities
};

//function to check ls and return values or default value
const readLocalStorage = (lsObject, defaultV) => {
  // get from using key name
  const dataFromLS = localStorage.getItem(lsObject);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultV;
  }
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
};

const renderForecastWeather = (forecastWeatherData) => {
  // render the forecast weather data and append each card to section
};

const renderWeatherData = (cityName) => {
  // use API to fetch current weather data
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  // from the response cherry pick all the data you want to see in the current weather card

  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;

  // render current weather data

  // render forecast weather data
};

const handleFormSubmit = () => {
  // get the city name from input
  // if city name is empty handle that
  // else render weather data
};

const onReady = () => {
  // render recent cities
  renderCities();
};

$(document).ready(onReady);
