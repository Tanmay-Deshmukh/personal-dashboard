const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');
const newsRoutes = require('./routes/news');
const stocksRoutes = require('./routes/stocks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/stocks', stocksRoutes);

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Demo endpoint with comprehensive data
app.post('/api/demo-login', (req, res) => {
  const demoData = {
    user: { name: "Demo User" },
    widgets: {
      weather: {
        name: "San Francisco",
        main: { temp: 72, humidity: 65 },
        weather: [{ description: "clear sky", icon: "01d" }],
        wind: { speed: 5.5 }
      },
      news: {
        articles: [
          {
            title: "Tech Breakthrough in Renewable Energy",
            description: "Scientists announce major advancement in solar cell technology.",
            url: "#",
            urlToImage: "https://via.placeholder.com/150"
          },
          {
            title: "New Web Development Framework Released",
            description: "Version 3.0 of popular framework offers significant performance improvements.",
            url: "#",
            urlToImage: "https://via.placeholder.com/150"
          }
        ]
      },
      stocks: [
        { symbol: 'AAPL', price: '175.43', change: '+1.23', changePercent: '+0.71%' },
        { symbol: 'MSFT', price: '337.69', change: '+2.54', changePercent: '+0.76%' },
        { symbol: 'GOOGL', price: '139.93', change: '-0.87', changePercent: '-0.62%' }
      ]
    }
  };
  res.json(demoData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});