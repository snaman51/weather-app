import React, { useState, useEffect, useContext } from "react";
import { fetchWeather } from "./api/fetchWeather";
import { TemperatureContext } from "./TemperatureContext";
import WeatherDisplay from "./WeatherDisplay";
import RecentSearches from "./RecentSearches";
import styles from "./App.module.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const { isCelsius, toggleUnit } = useContext(TemperatureContext);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const fetchData = async (city) => {
    setIsLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setCityName("");
      setError(null);
      
      const updatedSearches = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      setError("City not found. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData(cityName);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Weather App</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        <button onClick={() => fetchData(cityName)} className={styles.searchButton}>
          Search
        </button>
      </div>

      <div className={styles.unitToggle}>
        <span>°C</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={!isCelsius}
            onChange={toggleUnit}
          />
          <span className={[styles.slider,styles.round].join(" ")}></span>
        </label>
        <span>°F</span>
      </div>
      
      {isLoading && <div className={styles.loader}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      
      {weatherData && <WeatherDisplay data={weatherData} isCelsius={isCelsius} />}
      
      <RecentSearches searches={recentSearches} onSearchClick={fetchData} />
    </div>
  );
};

export default App;