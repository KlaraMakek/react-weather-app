import axios from 'axios';

axios.defaults.baseURL = `https://api.openweathermap.org/data/2.5/`;
const appIdQueryParam = `appid=a584720c43c130d020ae58d96440565e&lang=hr`;

function getCurrentWeather(location) {
    return axios.get(
        `weather?q=${location}&units=metric&${appIdQueryParam}`
    );
}

function getForecast(lat, lon) {

    return axios.get(
        `onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&${appIdQueryParam}`
    )

} 

function getLocationData(lat, long) {
    return axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=e2fab8c66d544337ab683010f85d4dc7&q=${lat}+${long}`
    );
}

export {
    getCurrentWeather,
    getForecast,
    getLocationData
}

