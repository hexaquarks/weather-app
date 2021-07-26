import React, { useState } from 'react';
import DataFetcher from './fetch_data.js';
import {dateBuilder, timeParser,manageSearchBox, manageMainWeatherIcon, leftColumnBuilder, rightColumnBuilder, manageBackgroundImage} from './helper_functions.js';
import images from './images.js';

function App() {

  const { weather, search, cityName, setCityName } = DataFetcher();


  return (
    <div className={manageBackgroundImage(weather)}>
      <main>
       {manageSearchBox(search,cityName, setCityName)}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            {/* the main contianer box + rectangle */}
            <div className="main-container">
              {/* the weather box (left) */}
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                {/* {images.map(({src}) => 
                  <img src={src} /> 
                )} */}
                 <img src={manageMainWeatherIcon(weather, images)} alt="main_icon"></img>
                {/* <img src={images[0]} alt="main_icon"></img> */}
                <div className="weather">{weather.weather[0].main}</div>
              </div>
              {/* the weather information rectangle (right) */}
              <div className="weather_information">
                <div className="left_column">
                  <tr>
                    {leftColumnBuilder(weather)}
                  </tr>
                </div>
                <div className="right_column">
                  <tr>
                    {rightColumnBuilder(weather)}
                  </tr>
                </div>
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;
