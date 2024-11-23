const CurrentWeather = ({ currentWeather }) => {
    return (

        <div className="current-weather">
            <img src={`icons/${currentWeather.weatherIcon}.svg`} alt="" className="weather-icon" />
            <h2 className="temperature" style={{ color: "#fff" }}>{currentWeather.temperature}<span>°C</span></h2>
            <p className="description" style={{ color: "#fff" }}>{currentWeather.description}</p>
        </div>

    )
}
export default CurrentWeather