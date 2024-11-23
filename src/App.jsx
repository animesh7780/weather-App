import SearchSection from "./components/SearchSection"
import CurrentWeather from "./components/CurrentWeather"
import HourlyForecast from "./components/HourlyForecast"
import { useEffect, useRef, useState } from "react"
import { weatherCodes } from "./constants"
import NoResults from "./components/NoResults"
const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const filterHourlyData = (hourlyData) => {
    // Set current hour to the top of the hour (e.g., 12:00:00)
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    // Filter data for the next 24 hours
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecast(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();

      //current weather data
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({ temperature, description, weatherIcon });

      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

      searchInputRef.current.value = data.location.name;
      filterHourlyData(combinedHourlyData);

    } catch {
      setHasNoResults(true)
    }
  }

  useEffect(() => {
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=delhi&days=2`;
    getWeatherDetails(API_URL)
  }, [])

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

      {hasNoResults ? (
        <NoResults />
      ) : (
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecast.map((hourlyWeather) => (
                <HourlyForecast key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;