import images from '../../images.js';
import { manageWeatherIcon, dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './ForecastContainer.module.css';

let type = '';
const leftMax = (type) => {
    return (type === 'weekly') ? 300 : 900;
}

const manageOpacity = (direction, xPos) => {
    if(xPos===0) return direction==='left' ? 25 : 100;
    else if(xPos<0 && xPos > -leftMax(type)) return 100;
    else if(xPos=== -leftMax(type)) return direction==='left' ? 100 : 25;
}
const ForecastContainer = (props) => {

    type = props.type;

    const [ xPos, setXPos ] = useState(0);

    // const [style, setStyle] = useState({ transform: `translateX(${xPos}px)` });
    const onClick = (direction) => {
        if(direction === 'left'){
            xPos === -leftMax(type) ? setXPos(xPos) : setXPos(xPos-100);
        }else{
            xPos === 0 ? setXPos(xPos) : setXPos(xPos+100);
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
                        ? forecastBuilderWeekly(props.forecastWeather, images)
                        : forecastBuilderHourly(props.forecastWeather, images)
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

const forecastBuilderWeekly = (forecastWeather, images) => {
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

    return populateForecastElements(8, forecastDays, forecastWeather);

}

const forecastBuilderHourly = (forecastWeather, images) => {
    if (forecastWeather.hourly === undefined) return ' ';

    
    forecastWeather = forecastWeather.hourly;
    const forecastHours = [];

    var hourIncrement = new Date();
    hourIncrement.setDate(hourIncrement.getDate());

    for (var i = 0; i < 24; i++) {
        hourIncrement.setHours(hourIncrement.getHours() + 1);
        forecastHours.push(formatAMPM(hourIncrement));
    }

    return populateForecastElements(24, forecastHours, forecastWeather);
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  const populateForecastElements = (numberOfElements, forecastNamesList, forecastWeather) => {
    const temp = [];
    for (var i = 0; i < numberOfElements; i++) {
        const altName = i+ "_icon";
        temp.push(
            <div className={i}>
                <p className="top_text">{forecastNamesList[i]}</p>
                <img src={manageWeatherIcon(forecastWeather[i], images)} alt={altName}></img>
                <p className="bottom_text">{Math.round(forecastWeather[i].temp)}°</p>
            </div>
        )
    }
    return temp;
}

// ForecastContainer.propTypes = {
//     weather: PropTypes.object.isRequired,
// };

export default ForecastContainer;