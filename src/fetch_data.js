import { useState } from 'react';
const api = {
    key: "536440fd4107c0626619eee26a13dfb4",  //comma important here
    base: "https://api.openweathermap.org/data/2.5/"  //base api url
}

function DataFetcher() {
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState('');
    const [forecastWeather, setForecastWeather] = useState('');
    const countNumber = 5;

    const search = event => {
        if (event.key === "Enter") {
            fetch(`${api.base}weather?q=${cityName}
    &units=metric&APPID=${api.key}`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data);
                    setCityName('');
                    console.log(data);
                });
            
            fetch(`${api.base}forecast/daily?q=${cityName}
            &units=metric&cnt=${countNumber}&appid=${api.key}`)
                .then(response => response.json())
                .then(data => {
                    setForecastWeather(data);
                    setCityName('');
                    console.log(data);
                });
        }
    }


    return {weather,forecastWeather, search, cityName, setCityName};
}

export default DataFetcher;
