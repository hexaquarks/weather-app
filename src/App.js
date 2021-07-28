import React, { useState } from 'react';
import DataFetcher from './fetch_data.js';
import { dateBuilder, forecastBuilder, timeParser, manageSearchBox, manageWeatherIcon, leftColumnBuilder, rightColumnBuilder, manageBackgroundImage } from './helper_functions.js';
import images from './images.js';

function App() {

  const { weather, forecastWeather, search, cityName, setCityName } = DataFetcher();
  { console.log(forecastWeather) }
  return (
    <div className="app">
      <main>
        {manageSearchBox(search, cityName, setCityName)}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location_box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            {/* the main contianer box + rectangle */}
            <div className="main_container">
              {/* the weather box (left) */}
              <div className={manageBackgroundImage(weather)}>
                <div className="top">
                  <div className="temp">
                    {Math.round(weather.main.temp)}
                  </div>
                  <button class="celsius">°C</button>
                  <span id="vertical_bar">|</span>
                  <button class="farenheit">°F</button>
                </div>
                <div className="real_feel">
                  <span>Feels Like {Math.round(weather.main.feels_like)}°C</span>
                </div>
                <img src={manageWeatherIcon(weather, images)} alt="main_icon"></img>
                <div className="weather_state">{weather.weather[0].main}</div>
              </div>
              {/* the weather information rectangle (right) */}
              <div className="weather_information">
                <div className="left_column">
                  <tr>
                    {leftColumnBuilder(weather)}
                    <hr></hr>
                  </tr>
                </div>
                <div className="right_column">
                  <tr>
                    {rightColumnBuilder(weather)}
                  </tr>
                </div>
              </div>
            </div>
            <div className="forecast_container">
              {forecastBuilder(forecastWeather, images)}
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;
