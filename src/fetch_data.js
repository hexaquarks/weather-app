import { useState } from 'react';
const api = {
    key: "536440fd4107c0626619eee26a13dfb4",  //comma important here
    base: "https://api.openweathermap.org/data/2.5/"  //base api url
}

// const geoKey = "158511353267085116134x75570";

const DataFetcher= (type) => {
    const [weather, setWeather] = useState('');
    const [forecastWeather, setForecastWeather] = useState('');
    const [hourlyWeather ,setHourlyWeather ] = useState('');

    const excludesWeekly = "current,minutely,hourly,alerts";
    const excludesHourly = "current,minutely,daily,alerts";


    const submitSearchRequest = (cityName, unit) => {

            fetch(`${api.base}weather?q=${cityName}&units=${unit}&APPID=${api.key}`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data);
                    console.log(data);

                    let long, lat;
                    if(typeof data.coord != "undefined"){
                        long = data.coord.lon;
                        lat = data.coord.lat;
                    } else {

                    }

                    if(type === 'weekly'){
                        return fetch(`${api.base}onecall?lat=${lat}&lon=${long}&units=${unit}&exclude=${excludesWeekly}&appid=${api.key}`);
                    } else if (type === 'hourly') {
                        console.log("IN")
                        return fetch(`${api.base}onecall?lat=${lat}&lon=${long}&units=${unit}&exclude=${excludesHourly}&appid=${api.key}`);
                    } 
                })
                .then(response => response.json())
                .then(r => {
                    setForecastWeather(r);
                    console.log(r);
                });
        
    }

    return { weather, forecastWeather, submitSearchRequest };
};

export default DataFetcher;
