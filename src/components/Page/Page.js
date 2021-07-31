
import React, { Fragment, useState } from 'react';
import DataFetcher from '../../fetch_data.js';

import images from '../../images.js';
import SearchBox from '../searchBox/SearchBox'

import LocationDetails from '../locationDetails/LocationDetails.js';
import CurrentDayContainer from '../currentDayContainer/CurrentDayContainer.js';
import ForecastContainer from '../forecastContainer/ForecastContainer.js';
import ForecastChartContainer from '../forecastChartContainer/ForecastChartContainer.js';

import styles from './Page.module.css';

// export const Context = React.createContext({ unitState: '°C', setUnitState: () => {} });

const Page = () => {

    const { weather, forecastWeather, submitRequest } = DataFetcher();


    const onKeyPress = value => {
        submitRequest(value);
    }

    return (
        <main>
            {/* {manageSearchBox(search, cityName, setCityName)} */}
            <SearchBox submitSearch={onKeyPress} />
            {(typeof weather.main != "undefined") ? (
                <div>
                    <LocationDetails weather={weather} />
                    {/* the main contianer box + rectangle */}
                    <CurrentDayContainer weather={weather} />
                    <ForecastContainer forecastWeather={forecastWeather} />
                    <ForecastChartContainer forecastWeather={forecastWeather} />
                </div>
            ) : ('')}
        </main>
    );
}

export default Page;