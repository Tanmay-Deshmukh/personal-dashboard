import { config } from './config';

export const fetchWeather = async (location) => {
  try {
    const apiKey = config.openWeather.apiKey;
    // First, get coordinates for the location (in case it's a city name)
    const geoResponse = await fetch(
      `${config.openWeather.baseUrl}/geo/1.0/direct?q=${location}&appid=${apiKey}`
    );
    const geoData = await geoResponse.json();
    if (!geoData || geoData.length === 0) {
      console.error('Geocoding API returned no data for location:', location);
      console.log('Response:', geoResponse);
      console.log('Data:', geoData);
      throw new Error('Location not found');
    }
    const { lat, lon } = geoData[0];
    // Then get weather data using coordinates
    const weatherResponse = await fetch(
      `${config.openWeather.baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );

    if (!weatherResponse.ok) {
      throw new Error('Weather data fetch failed');
    }

    const weatherData = await weatherResponse.json();
    return weatherData;
  } catch (err) {
    throw new Error('Failed to fetch weather data: ' + err.message);
  }
};