import images from '../../images.js';
import { manageWeatherIcon, dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './ForecastContainer.module.css';

const ForecastContainer = ({ forecastWeather }) => {

    const [xPos, setXPos ] = useState(0);
    const [style, setStyle] = useState({ transform: `translateX(${xPos}px)` });

    const onClick = (direction) => {
        (direction === 'left') ? setXPos(xPos => xPos-100) : setXPos(xPos => xPos +100);
        setStyle({ transform: `translateX(${xPos}px)` });
        console.log(xPos)
    }
    // style={{transform: `translate(-50px)`}} <-- does work tho
    return (
        <div className={styles.forecast_window}>
            <button className={styles.left_arrow} onClick={() => onClick("left")}></button>
            <div className={styles.forecast_slider}>
                <div className={styles.forecast_container} style={style}>
                    {forecastBuilder(forecastWeather, images)}
                </div>
            </div>
            <button className={styles.right_arrow} onClick={() => onClick("right")}></button>
        </div>
    )
}

const forecastBuilder = (forecastWeather, images) => {
    if (forecastWeather.daily === undefined) return ' ';

    forecastWeather = forecastWeather.daily;
    const forecastDaysClass = [
        'today', 'oneAfter',
        'twoAfter', 'threeAfter',
        'fourAfter', 'fiveAfter', 'sixAfter', 'sevenAfter'
    ];

    const forecastDays = ['Today'];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < 7; i++) {
        forecastDays.push(dateBuilder(dayIncrement).substr(
            0, dateBuilder(dayIncrement).indexOf(' '))
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }

    const temp = [];
    for (var i = 0; i < 7; i++) {
        const altName = forecastDaysClass[i] + "_icon";
        temp.push(
            <div className={forecastDaysClass[i]}>
                {forecastDays[i]}
                <img src={manageWeatherIcon(forecastWeather[i], images)} alt={altName}></img>
                <br></br>
                <span>{Math.round(forecastWeather[i].temp.eve)}° / {Math.round(forecastWeather[i].temp.night)}°</span>
            </div>
        )
    }
    return temp;
}

ForecastContainer.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default ForecastContainer;