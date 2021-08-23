
import React, { useState } from 'react';
import DataFetcher from '../../fetch_data.js';

import SearchBox from '../searchBox/SearchBox'

import LocationDetails from '../locationDetails/LocationDetails.js';
import CurrentDayContainer from '../currentDayContainer/CurrentDayContainer.js';
import ForecastContainer from '../forecastContainer/ForecastContainer.js';
import ForecastChartContainer from '../forecastChartContainer/ForecastChartContainer.js';


export const Context = React.createContext(
    {
        unitState: "°C",
        currentCity: "",
        setCurrentCity: () => { },
        setUnitState: () => { },
        submitRequest: () => { }
    });

const Page = ({ type }) => {

    const { weather, forecastWeather, submitRequest } = DataFetcher(type);
    const [unitState, setUnitState] = useState("°C");
    const [currentCity , setCurrentCity ] = useState("");

    const onKeyPress = value => {
        (unitState==="°C" ) ? submitRequest(value, "metric") : submitRequest(value, "imperial");
        setCurrentCity(value);
    }

    let propsForecast = {
        forecastWeather: forecastWeather,
        type: type //or {props.type} ? 
    }
    return (
        <Context.Provider value={{
            unitState,
            currentCity,
            setCurrentCity,
            setUnitState,
            submitRequest
        }}>

            <main>
                {/* {manageSearchBox(search, cityName, setCityName)} */}
                <SearchBox submitSearch={onKeyPress} />
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <LocationDetails weather={weather} />
                        {/* the main contianer box + rectangle */}
                        <CurrentDayContainer weather={weather} />
                        <ForecastContainer {...propsForecast} />
                        <ForecastChartContainer forecastWeather={forecastWeather} />
                    </div>
                ) : ('')}
            </main>
        </Context.Provider>
    );
}

export default Page;