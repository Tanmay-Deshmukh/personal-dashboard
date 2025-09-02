export const fetchWeather = async (location) => {
  try {
    const apiKey = import.meta.env.OPENWEATHER_API_KEY;
    // First, get coordinates for the location (in case it's a city name)
    const geoResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
    );
    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error('Location not found');
    }
    const { lat, lon } = geoResponse.data[0];
    // Then get weather data using coordinates
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
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