require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Weather Widget
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'San Francisco';
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// News Widget
app.get('/api/news', async (req, res) => {
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Stock Widget
app.get('/api/stocks', async (req, res) => {
  const symbol = req.query.symbol || 'AAPL';
  const apiKey = process.env.FINNHUB_API_KEY;
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Calendar Widget (Google API integration would require OAuth setup, see README)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));