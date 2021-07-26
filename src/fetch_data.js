import { useState } from 'react';
const api = {
    key: "bf7e8d38b5460eac0bedf81fbdb950cb",  //comma important here
    base: "https://api.openweathermap.org/data/2.5/"  //base api url
}

function DataFetcher() {
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState('');

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
        }
    }


    return {weather, search, cityName, setCityName};
}

export default DataFetcher;
