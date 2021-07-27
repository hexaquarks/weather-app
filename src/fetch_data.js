import { useState } from 'react';
const api = {
    key: "536440fd4107c0626619eee26a13dfb4",  //comma important here
    base: "https://api.openweathermap.org/data/2.5/"  //base api url
}

const geoKey = "158511353267085116134x75570";

function DataFetcher() {
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState('');
    const [forecastWeather, setForecastWeather] = useState('');
    // const [latlong ,setLatLong] = useState('');
    const countNumber = 5;
    const excludes = "current,minutely,hourly,alerts";
    let long, lat;

    const search = event => {
        if (event.key === "Enter") {

            // geoparsing api
            // fetch(`https://geocode.xyz/?locate=${cityName}&geoit=json&auth=${geoKey}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         setLatLong(data);
            //         // setCityName('');
            //         console.log(data);
            //     });


            fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data);
                    setCityName('');
                    console.log(data);

                    const long = data.coord.lon;
                    const lat = data.coord.lat;

                    return fetch(`${api.base}onecall?lat=${lat}&lon=${long}&units=metric&exclude=${excludes}&appid=${api.key}`);
                })
                .then(response => response.json())
                .then(r => {
                    setForecastWeather(r);
                    console.log(r);
                });

            // fetch(`${api.base}onecall?lat=0.1&lon=${weather.coord.lon}&units=metric&exclude=${excludes}&appid=${api.key}`)
            // .then(response => response.json())
            // .then(data => {
            //     setForecastWeather(data);
            //     // setCityName('');
            //     console.log(data);
            // });

            // console.log(weather + " here")
        }
    }

    return { weather, forecastWeather, search, cityName, setCityName };
}

export default DataFetcher;
