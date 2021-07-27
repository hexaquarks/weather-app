
export const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` //"template stream"
}

export const timeParser = (weather) => {

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

export const manageSearchBox = (search, cityName, setCityName) => {
    return (
        <div className="search_box">
            <input
                type="text"
                className="search_bar"
                placeholder="Search..."
                onChange={e => setCityName(e.target.value)}
                value={cityName} //cityName
                onKeyPress={search} //search 
            />
        </div>
    )
}

export const manageBackgroundImage = (weather) => {
    if (typeof weather.main != 'undefined') {
        const temperature = weather.main.temp;

        if (temperature > 16) return 'app warm';
        else if (temperature > 0 && temperature <= 16) return 'app normal';
        else if (temperature <= 0) return 'app cold';
    } else {
        return 'app normal';
    }
}

export const manageWeatherIcon = (weather, images) => {
    const main = weather.weather[0].main;
    const description = weather.weather[0].description;
    let id = weather.weather[0].id;

    if (id >= 200 && id <= 232) return images[8];
    else if (id >= 300 && id <= 321) return images[5];
    else if (id >= 500 && id <= 504) return images[6];
    else if (id >= 511 && id <= 531) return images[3];
    else if (id >= 600 && id <= 622 && id !== 611) return images[7];
    else if (id === 611) return images[1];
    else if (id >= 701 && id <= 781) return images[2];
    else if (id === 800) return images[0];
    else if (id === 801 || 802) return images[4];
    else if (id === 803 || 804) return images[2];
    else return images[9];
}

export const leftColumnBuilder = () => {
    return (
        <table>
            <tbody>
                <tr>WIND</tr>
                <tr>PRESSURE</tr>
                <tr>HUMIDITY</tr>
                <tr>VISIBILITY</tr>
                <tr><td><br /></td></tr>
                <tr>MIN. TEMP.</tr>
                <tr>MAX. TEMP.</tr>
                <tr><td><br /></td></tr>
                <tr>SUN RISE</tr>
                <tr>SUN SET</tr>
                {/* 10 elements */}
            </tbody>
        </table>
    )
}

export const rightColumnBuilder = (weather) => {
    return (
        <table>
            <tbody>
                <tr>{weather.wind.speed} m/s</tr>
                <tr>{weather.main.pressure / 100.} kPa </tr>
                <tr>{weather.main.humidity} %</tr>
                <tr>{weather.visibility / 1000} Km</tr>
                <tr><td><br /></td></tr>
                <tr>{weather.main.temp_min.toFixed(0)} °C</tr>
                <tr>{weather.main.temp_max.toFixed(0)} °C</tr>
                <tr><td><br /></td></tr>
                <tr>{timeParser(weather)[0].slice(0, timeParser(weather)[0].length - 6) + timeParser(weather)[0].slice(timeParser(weather)[0].length - 3, timeParser(weather)[0].length)}</tr>
                <tr>{timeParser(weather)[1].slice(0, timeParser(weather)[1].length - 6) + timeParser(weather)[1].slice(timeParser(weather)[1].length - 3, timeParser(weather)[1].length)}</tr>
                {/* 10 elements */}
            </tbody>
        </table>
    )
}

export const forecastBuilder = (forecastWeather, images) => {
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