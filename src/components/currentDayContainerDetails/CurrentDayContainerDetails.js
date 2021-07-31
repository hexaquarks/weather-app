
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Context } from '../Page/Page';
import styles from './CurrentDayContainerDetails.module.css';


const CurrentDayContainerDetails = ({ weather }) => {

    const { unitState } = useContext(Context);
    console.log(unitState + " is ")
    return (
        <div className={styles.weather_information}>
            <div className={styles.left_column}>
                <tr>
                    {leftColumnBuilder(weather)}
                    {/* <hr></hr> */}
                </tr>
            </div>
            <div className={styles.right_column}>
                <tr>
                    {rightColumnBuilder(weather, unitState)}
                </tr>
            </div>
        </div>
    )
}

const leftColumnBuilder = () => {

    return (
        <table>
            <tbody>
                <tr>WIND</tr>
                <tr>PRESSURE</tr>
                <tr>HUMIDITY</tr>
                <tr>VISIBILITY</tr>
                <tr><td><br /></td></tr>
                <tr>MAX. TEMP.</tr>
                <tr>MIN. TEMP.</tr>
                <tr><td><br /></td></tr>
                <tr>SUN RISE</tr>
                <tr>SUN SET</tr>
                {/* 10 elements */}
            </tbody>
        </table>
    )
}

const rightColumnBuilder = (weather,unitState) => {


    return (
        <table>
            <tbody>
                <tr>{weather.wind.speed} {unitState==="°C" ? "km/h" : "mph"}</tr>
                <tr>{weather.main.pressure / 100.} kPa </tr>
                <tr>{weather.main.humidity} %</tr>
                <tr>{weather.visibility / 1000} Km</tr>
                <tr><td><br /></td></tr>
                <tr>{weather.main.temp_max.toFixed(0)} {unitState} </tr>
                <tr>{weather.main.temp_min.toFixed(0)} {unitState}</tr>
                <tr><td><br /></td></tr>
                <tr>{timeParser(weather)[0].slice(0, timeParser(weather)[0].length - 8) + " " + timeParser(weather)[0].slice(timeParser(weather)[0].length - 4, timeParser(weather)[0].length)}</tr>
                <tr>{timeParser(weather)[1].slice(0, timeParser(weather)[1].length - 8) + " " + timeParser(weather)[1].slice(timeParser(weather)[1].length - 4, timeParser(weather)[1].length)}</tr>
                {/* 10 elements */}
            </tbody>
        </table>
    )
}

const timeParser = (weather) => {

    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;

    var sunriseDate = new Date(sunrise * 1000);
    var sunriseTimeString = sunriseDate.toLocaleTimeString();

    var sunsetDate = new Date(sunset * 1000);
    var sunsetTimeString = sunsetDate.toLocaleTimeString();

    return [
        sunriseTimeString,
        sunsetTimeString
    ]
}


CurrentDayContainerDetails.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default CurrentDayContainerDetails;