import images from '../../images.js';
import { manageWeatherIcon, dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './ForecastContainer.module.css';

const ForecastContainer = ({ forecastWeather }) => {

    const [xPos, setXPos ] = useState(0);
    // const [style, setStyle] = useState({ transform: `translateX(${xPos}px)` });
    const onClick = (direction) => {
        if(direction === 'left'){
            xPos === -300 ? setXPos(xPos) : setXPos(xPos-100);
            //colors
        }else{
            xPos === 0 ? setXPos(xPos) : setXPos(xPos+100);
            //colors
        }
    }

    return (
        <div className={styles.forecast_window}>
            <button className={styles.left_arrow} onClick={() => onClick('right')}></button>
            <div className={styles.forecast_slider}>
                <div className={styles.forecast_container} style={{transform : `translateX(${xPos}px)`}}>
                    {forecastBuilder(forecastWeather, images)}
                </div>
            </div>
            <button className={styles.right_arrow} onClick={() => onClick('left')}></button>
        </div>
    )
}

const forecastBuilder = (forecastWeather, images) => {
    if (forecastWeather.daily === undefined) return ' ';

    forecastWeather = forecastWeather.daily;
    const forecastDaysClass = [
        'today', 'oneAfter',
        'twoAfter', 'threeAfter',
        'fourAfter', 'fiveAfter', 'sixAfter', 'sevenAfter',     
        'eightAfter'
    ];

    const forecastDays = ['Today'];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < 8; i++) {
        forecastDays.push(dateBuilder(dayIncrement).substr(
            0, dateBuilder(dayIncrement).indexOf(' '))
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }

    const temp = [];
    for (var i = 0; i < 8; i++) {
        const altName = forecastDaysClass[i] + "_icon";
        temp.push(
            <div className={forecastDaysClass[i]}>
                <p className="top_text">{forecastDays[i]}</p>
                <img src={manageWeatherIcon(forecastWeather[i], images)} alt={altName}></img>
                <p className="bottom_text">{Math.round(forecastWeather[i].temp.eve)}° / {Math.round(forecastWeather[i].temp.night)}°</p>
            </div>
        )
    }
    return temp;
}

ForecastContainer.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default ForecastContainer;