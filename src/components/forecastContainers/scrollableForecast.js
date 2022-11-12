import { manageWeatherIcon, dateBuilder } from '../../helper_functions.js'
import { useState } from 'react'
import { Context } from '../page/page'
import { useContext } from 'react'
import images from '../../images.js'

import styles from './scrollableForecast.module.css';

const N_FORECAST_ELEMENTS_WEEKLY = 8
const N_FORECAST_ELEMENTS_DAILY = 24
const LOW_OPACITY_PERCENTAGE = 25
const HIGH_OPACITY_PERCENTAGE = 100
const SHIFT_VALUE = 100
const WEEKLY_SCROLLPANE_WIDTH = 900
const DAILY_SCROLLPANE_WIDTH = 300

let forecastType = '';
const leftMax = (forecastType) => {
    return (forecastType === 'weekly') ? DAILY_SCROLLPANE_WIDTH : WEEKLY_SCROLLPANE_WIDTH;
}

const manageOpacity = (direction, xPos) => {
    if (xPos === 0) return direction === 'left' ? LOW_OPACITY_PERCENTAGE : HIGH_OPACITY_PERCENTAGE;
    else if (xPos < 0 && xPos > -leftMax(forecastType)) return HIGH_OPACITY_PERCENTAGE;
    else if (xPos === -leftMax(forecastType)) return direction==='left' ? HIGH_OPACITY_PERCENTAGE : LOW_OPACITY_PERCENTAGE;
}

const ScrollableForecast = (props) => {
    forecastType = props.type;

    const { temperatureUnit, setTemperatureUnit } = useContext(Context); 
    const [ xPos, setXPos ] = useState(0);

    const onClick = (direction) => {
        if (direction === 'left') {
            xPos === -leftMax(forecastType) ? setXPos(xPos) : setXPos(xPos - SHIFT_VALUE);
        } else {
            xPos === 0 ? setXPos(xPos) : setXPos(xPos + SHIFT_VALUE);
        }
    }

    return (
        <div className={styles.forecast_window}>
            <button className={styles.left_arrow} 
                    onClick={() => onClick('right')}
                    style={{opacity: `${manageOpacity('left' , xPos)}%`}}>        
            </button>
            <div className={styles.forecast_slider}>
                <div className={styles.forecast_container} style={{transform : `translateX(${xPos}px)`}}>
                    {props.type==='weekly' 
                        ? forecastBuilderWeekly(props.forecastWeather, props.type, temperatureUnit)
                        : forecastBuilderHourly(props.forecastWeather, props.type, temperatureUnit)
                    }
                </div>
            </div>
            <button className={styles.right_arrow} 
                    onClick={() => onClick('left')}
                    style={{opacity: `${manageOpacity('right' , xPos)}%`}}>
            </button>
        </div>
    )
}

const forecastBuilderWeekly = (forecastWeather, forecastType, temperatureUnit) => {
    if (forecastWeather.daily === undefined) return ' ';

    forecastWeather = forecastWeather.daily;    
    const forecastDays = ['Today'];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < N_FORECAST_ELEMENTS_WEEKLY; i++) {
        forecastDays.push(dateBuilder(dayIncrement).substr(
            0, dateBuilder(dayIncrement).indexOf(' '))
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }

    return populateForecastElements(N_FORECAST_ELEMENTS_WEEKLY, forecastDays, forecastWeather, forecastType, temperatureUnit);
}

const forecastBuilderHourly = (forecastWeather, forecastType, temperatureUnit) => {
    if (forecastWeather.hourly === undefined) return ' ';
    
    forecastWeather = forecastWeather.hourly;
    const forecastHours = [];

    var hourIncrement = new Date();
    hourIncrement.setDate(hourIncrement.getDate());

    for (var i = 0; i < N_FORECAST_ELEMENTS_DAILY; i++) {
        hourIncrement.setHours(hourIncrement.getHours() + 1);
        forecastHours.push(formatAMPM(hourIncrement));
    }

    return populateForecastElements(N_FORECAST_ELEMENTS_DAILY, forecastHours, forecastWeather, forecastType, temperatureUnit);
}

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + " " + ampm;
    return strTime;
}

const populateForecastElements = (numberOfElements, forecastNamesList, forecastWeather, type, temperatureUnit) => {
    const elements = [];
    console.log(temperatureUnit)
    for (var i = 0; i < numberOfElements; i++) {
        const altName = i+ "_icon";
        elements.push(
            <div className={i}>
                <p className="top_text">{forecastNamesList[i]}</p>
                <img src={manageWeatherIcon(forecastWeather[i], images)} alt={altName}></img>
                {forecastType === 'weekly' 
                    ? <p className="bottom_text">{Math.round(forecastWeather[i].temp.eve)} / {Math.round(forecastWeather[i].temp.night)} {(temperatureUnit)}</p>
                    : <p className="bottom_text">{Math.round(forecastWeather[i].temp)} {temperatureUnit} </p>
                }
            </div>
        )
    }
    return elements;
}

// ScrollableForecast.propTypes = {
//     weather: PropTypes.object.isRequired,
// };

export default ScrollableForecast;