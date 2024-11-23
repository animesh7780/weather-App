const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const handleCitySearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector('.search-input');
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL)

    }

    // Get Current Location
    const handleLocationSearch = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            const { latitude, longitude } = position.coords
            const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
            getWeatherDetails(API_URL);
        },
            () => {
                alert("Location Access Denied")
            }
        )
    }

    return (
        <div className="search_section">
            <form action="" className="search-form" onSubmit={handleCitySearch}>
                <span className="material-symbols-rounded"></span>
                <input type="text" placeholder="Enter a city" ref={searchInputRef} className="search-input" required />
            </form>
            <button className="location-button" onClick={handleLocationSearch}>
                <span className="material-symbols-rounded">TAP</span>
            </button>
        </div>
    )
}

export default SearchSection