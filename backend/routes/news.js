const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET news data
router.get('/', async (req, res) => {
  try {
    const { category = 'technology', count = 5 } = req.query;
    const apiKey = process.env.NEWSAPI_API_KEY;
    
    // Using NewsAPI (might need to use a different API if this has limits)
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${count}&apiKey=${apiKey}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.message);
    
    // Fallback to demo data if API fails
    const demoNews = [
      {
        title: "Tech Company Announces Breakthrough in AI",
        description: "A major tech company has announced a significant advancement in artificial intelligence technology.",
        url: "https://example.com/news/1",
        urlToImage: "https://via.placeholder.com/150",
        publishedAt: new Date().toISOString()
      },
      {
        title: "New JavaScript Framework Released",
        description: "Developers have released a new framework that promises to simplify web development.",
        url: "https://example.com/news/2",
        urlToImage: "https://via.placeholder.com/150",
        publishedAt: new Date().toISOString()
      }
    ];
    
    res.json({ articles: demoNews });
  }
});

module.exports = router;