
import React, { useState, useRef, useEffect } from 'react';

import DataFetcher from '../../fetch_data.js';
import SearchBox from '../searchBox/SearchBox'
import LocationDetails from '../locationDetails/LocationDetails.js';
import CurrentDayContainer from '../currentDayContainer/CurrentDayContainer.js';
import ForecastContainer from '../forecastContainer/ForecastContainer.js';
import ForecastChartContainer from '../forecastChartContainer/ForecastChartContainer.js';


export const Context = React.createContext({
    temperatureUnit: "°C",
    currentCity: "",
    setCurrentCity: () => { },
    setTemperatureUnit: () => { },
    submitSearchRequest: () => { }
});

function useFirstRender() {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
}
const firstRenderCity = "Montreal"

const Page = ({ type }) => {
    const { weather, forecastWeather, submitSearchRequest } = DataFetcher(type);
    const [temperatureUnit, setTemperatureUnit] = useState("°C");
    const [currentCity, setCurrentCity] = useState("temp");

    const onKeyPress = value => {
        submitSearchRequest(
            value,
            (temperatureUnit === "°C") ? "metric" : "imperial"
        )
        setCurrentCity(value);
    }

    const firstRender = useFirstRender();

    useEffect(() => {
        if (firstRender) {
            onKeyPress(firstRenderCity)
        }
    }, [firstRender]);

    let propsForecast = {
        forecastWeather: forecastWeather,
        type: type
    }
    return (
        <Context.Provider value={{
            temperatureUnit,
            currentCity,
            setCurrentCity,
            setTemperatureUnit,
            submitSearchRequest
        }}>
            <main>
                <SearchBox submitSearch={onKeyPress} /> {
                    (weather.main !== undefined)
                        ? (
                            <div>
                                <LocationDetails weather={weather} />
                                {/* the main contianer box + rectangle */}
                                <CurrentDayContainer weather={weather} />
                                <ForecastContainer {...propsForecast} />
                                <ForecastChartContainer {...propsForecast} />
                            </div>
                        )
                        : ('')
                }
            </main>
        </Context.Provider>
    );
}

export default Page;