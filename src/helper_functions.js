
export const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` //"template stream"
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

        if (temperature > 16) return 'weather_box warm';
        else if (temperature > 0 && temperature <= 16) return 'weather_box normal';
        else if (temperature <= 0) return 'weather_box cold';
    } else {
        return 'weather_box normal';
    }
}

export const manageWeatherIcon = (weather, images) => {
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

