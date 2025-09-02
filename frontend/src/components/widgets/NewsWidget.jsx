import React, { useState, useEffect } from 'react';
import '../styles/Widget.css';
import { fetchNews } from '../utils/news';

const NewsWidget = ({ category = 'technology', count = 5 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const data = await fetchNews(category, count);
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
        // Fallback to demo data
        setArticles([
          {
            title: "Tech Breakthrough in Renewable Energy",
            description: "Scientists announce major advancement in solar cell technology.",
            url: "#",
            source: { name: "Tech News" }
          },
          {
            title: "New Web Development Framework Released",
            description: "Version 3.0 of popular framework offers significant performance improvements.",
            url: "#",
            source: { name: "Dev Weekly" }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, [category, count]);

  if (loading) return <div className="widget loading">Loading news...</div>;
  if (error) return <div className="widget error">{error}</div>;

  return (
    <div className="widget news-widget">
      <h3>Latest News</h3>
      <div className="news-list">
        {articles.map((article, index) => (
          <div key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h4>{article.title}</h4>
            </a>
            <p>{article.description}</p>
            <span className="news-source">{article.source?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;