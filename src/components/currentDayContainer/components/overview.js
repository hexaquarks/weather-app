import { manageWeatherIcon } from "../../../helper_functions.js";
import images from '../../../images.js';
import PropTypes from 'prop-types';

import { Context } from '../../page/page';
import { useContext } from 'react';
import styles from './overview.module.css';

const manageBackgroundImage = (weather) => {
    if (typeof weather.main === 'undefined') return `${styles.weather_box} ${styles.normal}`;
    const temperature = weather.main.temp;

    if (temperature > 16) return `${styles.weather_box} ${styles.warm}`;
    else if (temperature > 0 && temperature <= 16) return `${styles.weather_box} ${styles.normal}`;
    else if (temperature <= 0) return `${styles.weather_box} ${styles.cold}`;
}

const Overview = ({ weather }) => {  
    const { unitState, setUnitState } = useContext(Context); 
    const { currentCity } = useContext(Context);
    const { submitRequest } = useContext(Context);


    const onClick = (currentCity, unit) => {
        submitRequest(currentCity, unit);
        (unit === "metric") ? setUnitState("°C") : setUnitState("°F");
    }

    console.log("-----: " + currentCity);
    return (
        <div className={manageBackgroundImage(weather)}>
            <div className={styles.top}>
                <div className={styles.temp}>
                    {Math.round(weather.main.temp)}
                </div>
                <button className={styles.celsius} onClick={() => onClick(currentCity, "metric")}>°C</button>
                <span id={styles.vertical_bar}>|</span>
                <button className={styles.farenheit} onClick={() => submitRequest(currentCity, "imperial")}>°F</button>
            </div>
            <div className={styles.real_feel}>
                <span>Feels Like {Math.round(weather.main.feels_like)} {unitState} </span>
            </div>
            <img src={manageWeatherIcon(weather, images)} alt="main_icon"></img>
            <div className={styles.weather_state}>{weather.weather[0].main}</div>
        </div>
    )
}

Overview.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default Overview;