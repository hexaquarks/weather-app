import { useState } from 'react';

const api = {
    key: "536440fd4107c0626619eee26a13dfb4",  //comma important here
    base: "https://api.openweathermap.org/data/2.5/"  //base api url
}

// const geoKey = "158511353267085116134x75570";

const DataFetcher= (type) => {
    const [weather, setWeather] = useState('')
    const [forecastWeather, setForecastWeather] = useState('')

    const tokensToExcludeInForecastRequest = 
    {
        weekly: "current,minutely,hourly,alerts",
        hourly: "current,minutely,daily,alerts"
    }

    const submitSearchRequest = (cityName, unit) => {
        const baseRequest = `${api.base}weather?` + 
                            `q=${cityName}&` + 
                            `units=${unit}&` +
                            `APPID=${api.key}`
        fetch(baseRequest)
            .then(response => response.json())
            .then(data => {
                setWeather(data)

                let long, lat
                if (data.coord) {
                    long = data.coord.lon
                    lat = data.coord.lat
                } 
                const tokensToExclude = (type === 'weekly') 
                    ? tokensToExcludeInForecastRequest.weekly 
                    : tokensToExcludeInForecastRequest.hourly
                const forecastRequest = `${api.base}onecall?l` + 
                                        `at=${lat}&` + 
                                        `lon=${long}&` + 
                                        `units=${unit}&` + 
                                        `exclude=${tokensToExclude}&` + 
                                        `appid=${api.key}`
                return fetch(forecastRequest)
            })
            .then(response => response.json())
            .then(r => {
                setForecastWeather(r)
            })
    }

    return { weather, forecastWeather, submitSearchRequest }
}

export default DataFetcher
