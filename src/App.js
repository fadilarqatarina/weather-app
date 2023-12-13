import React, { useState } from "react";
import SearchBar from "./components/search/SearchBar";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import "./App.css";

function App() {
  // state hooks
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // the function that gets the searchData from SearchBar
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    // with every white space, put it in an array
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // represents the async operation whether it will pass or fail, returns one single promise
    // will be fulfilled once all is fulfilled
    // will return an array of all the fulfilled
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // will respond in a json file
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // set the weather response as the new state
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  console.log(currentWeather, forecast);
  return (
    <div className="container">
      <SearchBar onSearchBarChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <br></br>
      <br></br>
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
