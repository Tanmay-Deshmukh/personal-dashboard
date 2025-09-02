// server/routes/stocks.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET stock data
router.get('/', async (req, res) => {
  try {
    const { symbols = 'AAPL,MSFT,GOOGL' } = req.query;
    const apiKey = process.env.ALPHAVANTAGE_API_KEY;
    
    // Using Alpha Vantage API (free tier has rate limits)
    const responses = await Promise.all(
      symbols.split(',').map(symbol => 
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
      )
    );
    
    const stockData = responses.map((response, index) => {
      const symbol = symbols.split(',')[index];
      const data = response.data['Global Quote'];
      
      if (!data) {
        return {
          symbol,
          error: 'No data available'
        };
      }
      
      return {
        symbol,
        price: data['05. price'],
        change: data['09. change'],
        changePercent: data['10. change percent']
      };
    });
    
    res.json(stockData);
  } catch (error) {
    console.error('Stocks API error:', error.message);
    
    // Fallback to demo data
    const demoStocks = [
      { symbol: 'AAPL', price: '175.43', change: '+1.23', changePercent: '+0.71%' },
      { symbol: 'MSFT', price: '337.69', change: '+2.54', changePercent: '+0.76%' },
      { symbol: 'GOOGL', price: '139.93', change: '-0.87', changePercent: '-0.62%' }
    ];
    
    res.json(demoStocks);
  }
});

module.exports = router;