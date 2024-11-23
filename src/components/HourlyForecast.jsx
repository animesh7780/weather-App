import { weatherCodes } from "../constants";
const HourlyForecast = ({ hourlyWeather }) => {

    const temperature = Math.floor(hourlyWeather.temp_c);
    const time = hourlyWeather.time.split(" ")[1];
    const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code));

    return (
        <li className="weather-item">
            <p className="time" style={{ color: "#fff" }}>{time}</p>
            <img src={`icons/${weatherIcon}.svg`} alt="" className="weather-icon" />
            <p className="temperatue" style={{ color: "#fff" }}>{temperature}</p>
        </li>
    )
}

export default HourlyForecast