//application API key
const API_KEY = "638741ded1msh07bc6f796714e78p1d32e2jsnea59f0e47a93";
//target the html elements
const recentCitiesContainer = $("#recent-cities");
const weatherInfoContainer = $("#weather-info-container");
const searchButton = $("#search-button");
const searchAlert = $("#search-alert");
let alertMessage;

const localStorageRecentCities = [];
const initializeData = () => {
  //initialize local storage
  JSON.parse(window.localStorage.getItem("recentCities")) ||
    window.localStorage.setItem("recentCities", JSON.stringify(localStorageRecentCities));
  //empty recent cities container

  //render the recent search
  renderCities();
};

const renderCities = () => {
  // get recent cities from LS
  const recentCities = JSON.parse(window.localStorage.getItem("recentCities"));
  //empty container
  recentCitiesContainer.empty();
  // if [] is empty then render alert
  if (recentCities.length === 0) {
    //render alert
    alertMessage = `<div class="recent-cities-alert btn"><p>No Past Searches!</p></div>`;
    recentCitiesContainer.append(alertMessage);
  } else {
    //render recent cities
    for (let i = 0; i < recentCities.length; i += 1) {
      let recentCite = `<div class="recent-cities-resent btn"><p id = "${recentCities[i]}">${recentCities[i]}</p></div>`;
      recentCitiesContainer.append(recentCite);
    }
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

const getUviClassName = (uvi) => {
  if (uvi >= 0 && uvi <= 2) {
    return "bg-success";
  }

  if (uvi > 2 && uvi <= 8) {
    return "bg-warning";
  }
  if (uvi > 8) {
    return "bg-danger";
  }
};

const renderCurrentWeather = (data) => {
  // render the current weather data and append to section
  const currentWeatherCard = `<div class="p-3">
    <div class="text-center">
      <h2 class="my-2">${data.cityName}</h2>
      <h3 class="my-2">${moment
        .unix(data.weatherData.current.dt + data.weatherData.timezone_offset)
        .format("dddd, Do MMM, YYYY HH:mm:ss")}</h3>
      <div>
        <img
          src="http://openweathermap.org/img/w/${data.weatherData.current.weather[0].icon}.png"
          alt="weather icon"
          class="shadow-sm p-3 mt-3 bg-body rounded border"
        />
      </div>
    </div>
    <!-- weather metric div -->
    <div class="mt-4">
      <div class="row g-0">
        <div class="weather-data-table col-sm-12 col-md-4 p-2 border  fw-bold">
          Temperature
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${data.weatherData.current.temp}&deg; C</div>
      </div>
      <div class="row g-0">
        <div class="weather-data-table col-sm-12 col-md-4 p-2 border  fw-bold">
          Humidity
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${
          data.weatherData.current.humidity
        }&percnt;</div>
      </div>
      <div class="row g-0">
        <div class="weather-data-table col-sm-12 col-md-4 p-2 border  fw-bold">
          Wind Speed
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">${data.weatherData.current.wind_speed} MPH</div>
      </div>
      <div class="row g-0">
        <div class="weather-data-table col-sm-12 col-md-4 p-2 border fw-bold">
          UV Index
        </div>
        <div class="col-sm-12 col-md-8 p-2 border">
          <span class="text-white px-3 rounded-2 ${getUviClassName(
            data.weatherData.current.uvi
          )}">${data.weatherData.current.uvi}</span>
        </div>
      </div>
    </div>
  </div>`;

  weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastWeather = (data) => {
  // render the forecast weather data and append each card to section
  const createForecastCard = (each) => {
    const forecast = `<div class="card m-2 forecast-card">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/${each.weather[0].icon}.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">${moment.unix(each.dt).format("ddd, Do MMM")}</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class=" weather-data-table col-12 p-2 border fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">${each.temp.day}&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="weather-data-table col-12 p-2 border fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">${each.humidity}&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="weather-data-table col-12 p-2 border fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">${each.wind_speed} MPH</div>
          </div>
          <div class="row g-0">
            <div class="weather-data-table col-12 p-2 border fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="text-white px-3 rounded-2 ${getUviClassName(each.uvi)}"
                >${each.uvi}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>`;

    return forecast;
  };

  const forecastCards = data.weatherData.daily.slice(1, 6).map(createForecastCard).join("");

  const forecastWeatherCards = `<div>
    <h2 class="mt-3 text-center">5-day Forecast</h2>
    <hr />
    <div class="d-flex flex-row justify-content-center flex-wrap">
      ${forecastCards}
    </div>
  </div>`;

  weatherInfoContainer.append(forecastWeatherCards);
};

const renderErrorAlert = () => {
  // empty container
  weatherInfoContainer.empty();

  const alert = `<div class="alert alert-danger" role="alert">
    Something went wrong!! Please try again.
  </div>`;

  weatherInfoContainer.append(alert);
};

const renderWeatherData = async (cityName) => {
  try {
    // fetch weather data
    const weatherData = await fetchWeatherData(cityName);
    // empty container
    weatherInfoContainer.empty();

    // render current data
    renderCurrentWeather(weatherData);

    // render forecast data
    renderForecastWeather(weatherData);

    return true;
  } catch (error) {
    renderErrorAlert();
    return false;
  }
};

//construct url for the api
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchWeatherData = async (cityName) => {
  // fetch data from API
  // current data url
  const currentDataUrl = constructUrl("https://api.openweathermap.org/data/2.5/weather", {
    q: cityName,
    appid: "652867178169694693f42b9870238545",
  });

  const currentData = await fetchData(currentDataUrl);

  // get lat, lon and city name
  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const displayCityName = currentData?.name;

  // forecast url
  const forecastDataUrl = constructUrl("https://api.openweathermap.org/data/2.5/onecall", {
    lat: lat,
    lon: lon,
    exclude: "minutely,hourly",
    units: "metric",
    appid: "652867178169694693f42b9870238545",
  });

  const forecastData = await fetchData(forecastDataUrl);

  return {
    cityName: displayCityName,
    weatherData: forecastData,
  };
};

const handleFormSubmit = (event) => {
  //stop form default submit
  event.preventDefault();
  // get the city name from input
  const searchFieldValue = $("#search-input").val();
  // if city name is empty handle that

  if (searchFieldValue === "") {
    //empty the container
    searchAlert.empty();
    //render alert
    alertMessage = `<p class="alert alert-danger">Please Enter a City!</p>`;
    searchAlert.append(alertMessage);
  } else {
    //read from local storage
    const dataFromLS = JSON.parse(window.localStorage.getItem("recentCities"));

    if (!dataFromLS.includes(searchFieldValue)) {
      console.log("Test1");
      dataFromLS.push(searchFieldValue);
      //write to local storage
      localStorage.setItem("recentCities", JSON.stringify(dataFromLS));
      //render cities
      renderCities();
    }
    // else render weather data
    renderWeatherData(searchFieldValue);
  }
};

const handleRecentSearch = (event) => {
  const targetTheEvent = event.target.id;
  //if the search is not empty
  if (targetTheEvent !== "") {
    renderWeatherData(targetTheEvent);
  }
};

const onReady = () => {
  //check local storage
  initializeData();
  //add search event listener
  searchButton.on("click", handleFormSubmit);
  //add a recent search event listener
  recentCitiesContainer.on("click", handleRecentSearch);
};

$(document).ready(onReady);
