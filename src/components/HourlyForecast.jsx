import { weatherCodes } from "../constants";
const HourlyForecast = ({ hourlyWeather }) => {

    const temperature = Math.floor(hourlyWeather.temp_c);
    const time = hourlyWeather.time;
    const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code));

    return (
        <li className="weather-item">
            <p className="time">{time}</p>
            <img src={`icons/${weatherIcon}.svg`} alt="" className="weather-icon" />
            <p className="temperatue">{temperature}</p>
        </li>
    )
}

export default HourlyForecast