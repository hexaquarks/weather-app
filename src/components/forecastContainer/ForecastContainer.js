import images from '../../images.js';
import { manageWeatherIcon, dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';

import styles from './ForecastContainer.module.css';

const ForecastContainer = ({ forecastWeather }) => {
    return (
        <div className={styles.forecast_container}>
            {forecastBuilder(forecastWeather, images)}
        </div>
    )
}

const forecastBuilder = (forecastWeather, images) => {
    if (forecastWeather.daily === undefined) return ' ';

    forecastWeather = forecastWeather.daily;
    const forecastDaysClass = [
        'today', 'oneAfter',
        'twoAfter', 'threeAfter',
        'fourAfter', 'fiveAfter'
    ];

    const forecastDays = [ 'Today' ];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < 5; i++) {
        forecastDays.push(dateBuilder(dayIncrement).substr(
            0, dateBuilder(dayIncrement).indexOf(' '))
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }

    const temp = [];
    for (var i = 0; i < 5; i++) {
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