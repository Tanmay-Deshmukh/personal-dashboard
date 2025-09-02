import React, { useState, useEffect } from 'react';
import '../../styles/Widget.css';

const WeatherWidget = ({ location = 'auto' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_URL = process.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}/api/weather?location=${location}`);
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to load weather data');
        // Fallback to demo data
        setWeather({
          name: "San Francisco",
          main: { temp: 72, humidity: 65 },
          weather: [{ description: "clear sky", icon: "01d" }],
          wind: { speed: 5.5 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) return <div className="widget loading">Loading weather...</div>;
  if (error) return <div className="widget error">{error}</div>;

  return (
    <div className="widget weather-widget">
      <h3>Weather in {weather.name}</h3>
      <div className="weather-main">
        <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description}
        />
        <span className="temperature">{Math.round(weather.main.temp)}°F</span>
      </div>
      <p>{weather.weather[0].description}</p>
      <div className="weather-details">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {Math.round(weather.wind.speed)} mph</span>
      </div>
    </div>
  );
};

export default WeatherWidget;