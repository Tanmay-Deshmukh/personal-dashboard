const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET weather data
router.get('/', async (req, res) => {
  try {
    const { location = 'San Francisco' } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // First, get coordinates for the location (in case it's a city name)
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
    );
    
    if (!geoResponse.data || geoResponse.data.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    const { lat, lon } = geoResponse.data[0];
    
    // Then get weather data using coordinates
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );
    
    res.json(weatherResponse.data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;