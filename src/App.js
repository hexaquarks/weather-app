import React, { useState } from 'react';
import DataFetcher from './fetch_data.js';
import {dateBuilder, timeParser,manageSearchBox, manageMainWeatherIcon, leftColumnBuilder, rightColumnBuilder, manageBackgroundImage} from './helper_functions.js';
import images from './images.js';

function App() {

  const { weather, forecastWeather, search, cityName, setCityName } = DataFetcher();

  return (
    <div className={manageBackgroundImage(weather)}>
      <main>
       {manageSearchBox(search,cityName, setCityName)}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location_box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            {/* the main contianer box + rectangle */}
            <div className="main_container">
              {/* the weather box (left) */}
              <div className="weather_box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="real_feel">
                  <span>Feels Like {Math.round(weather.main.feels_like)} °C</span>
                </div>
                 <img src={manageMainWeatherIcon(weather, images)} alt="main_icon"></img>
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
              {console.log(forecastWeather)}
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;
