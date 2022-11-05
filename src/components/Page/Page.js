
import React, { useState, useRef, useEffect } from 'react';

import DataFetcher from '../../fetch_data.js';
import SearchBox from '../searchBox/SearchBox'
import LocationDetails from '../locationDetails/LocationDetails.js';
import CurrentDayContainer from '../currentDayContainer/CurrentDayContainer.js';
import ForecastContainer from '../forecastContainer/ForecastContainer.js';
import ForecastChartContainer from '../forecastChartContainer/ForecastChartContainer.js';


export const Context = React.createContext({
    unitState: "°C",
    currentCity: "",
    setCurrentCity: () => { },
    setUnitState: () => { },
    submitRequest: () => { }
});

function useFirstRender() {
    const firstRender = useRef(true);
  
    useEffect(() => {
      firstRender.current = false;
    }, []);
  
    return firstRender.current;
}

const Page = ({ type }) => {

    const { weather, forecastWeather, submitRequest } = DataFetcher(type);
    const [unitState, setUnitState] = useState("°C");
    const [currentCity, setCurrentCity] = useState("temp");
    
    const onKeyPress = value => {
        submitRequest(
            value, 
            (unitState === "°C") ? "metric" : "imperial" 
        )
        setCurrentCity(value);
    }

    const firstRender = useFirstRender();

    useEffect(() => {
      if (firstRender) {
        onKeyPress("Montreal")
      }
    }, [firstRender]);

    let propsForecast = {
        forecastWeather: forecastWeather,
        type: type 
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
                <SearchBox submitSearch={onKeyPress} />
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <LocationDetails weather={weather} />
                        {/* the main contianer box + rectangle */}
                        <CurrentDayContainer weather={weather} />
                        <ForecastContainer {...propsForecast} />
                        <ForecastChartContainer {...propsForecast} />
                    </div>
                ) : ('')}
            </main>
        </Context.Provider>
    );
}

export default Page;