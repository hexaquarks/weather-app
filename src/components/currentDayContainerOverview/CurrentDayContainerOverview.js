import { manageWeatherIcon } from "../../helper_functions.js";
import images from '../../images.js';
import PropTypes from 'prop-types';
import graphType from '../forecastChartContainer/ForecastChartContainer.js';
import {  useState } from 'react';
import { Context } from '../Page/Page';
import { useContext } from 'react';
import styles from './CurrentDayContainerOverview.module.css';

const manageBackgroundImage = (weather) => {
    if (typeof weather.main === 'undefined') return `${styles.weather_box} ${styles.normal}`;
    const temperature = weather.main.temp;

    if (temperature > 16) return `${styles.weather_box} ${styles.warm}`;
    else if (temperature > 0 && temperature <= 16) return `${styles.weather_box} ${styles.normal}`;
    else if (temperature <= 0) return `${styles.weather_box} ${styles.cold}`;
}

const CurrentDayContainerOverview = ({ weather }) => {  
    const { unitState, currentCity, submitRequest } = useContext(Context); 
    // const { submitRequest } = useContext(Context);
    // const { currentCity } = useContext(Context);

    console.log("-----: " + currentCity);
    return (
        <div className={manageBackgroundImage(weather)}>
            <div className={styles.top}>
                <div className={styles.temp}>
                    {Math.round(weather.main.temp)}
                </div>
                <button class={styles.celsius} onClick={() => submitRequest(currentCity, "metric")}>°C</button>
                <span id={styles.vertical_bar}>|</span>
                <button class={styles.farenheit} onClick={() => submitRequest(currentCity, "imperial")}>°F</button>
            </div>
            <div className={styles.real_feel}>
                <span>Feels Like {Math.round(weather.main.feels_like)} {unitState} </span>
            </div>
            <img src={manageWeatherIcon(weather, images)} alt="main_icon"></img>
            <div className={styles.weather_state}>{weather.weather[0].main}</div>
        </div>
    )
}

CurrentDayContainerOverview.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default CurrentDayContainerOverview;