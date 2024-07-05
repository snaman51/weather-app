import React from 'react';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay = ({ data, isCelsius }) => {
  return (
    <div className={styles.weatherDisplay}>
      <h2>{data.location.name}, {data.location.region}, {data.location.country}</h2>
      <div className={styles.mainInfo}>
        <img src={data.current.condition.icon} alt={data.current.condition.text} className={styles.icon} />
        <p className={styles.temperature}>
          {isCelsius ? `${data.current.temp_c}°C` : `${data.current.temp_f}°F`}
        </p>
      </div>
      <p className={styles.condition}>{data.current.condition.text}</p>
      <div className={styles.details}>
        <p>Humidity: {data.current.humidity}%</p>
        <p>Pressure: {data.current.pressure_mb} mb</p>
        <p>Visibility: {data.current.vis_km} km</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;