import React, { useState, useEffect } from 'react';
import '../../styles/Widget.css';

const StocksWidget = ({ symbols = 'AAPL,MSFT,GOOGL' }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const API_URL = process.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}/api/stocks?symbols=${symbols}`);
        if (!response.ok) {
          throw new Error('Stocks data fetch failed');
        }
        const data = await response.json();
        setStocks(data);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to load stock data');
        // Fallback to demo data
        setStocks([
          { symbol: 'AAPL', price: '175.43', change: '+1.23', changePercent: '+0.71%' },
          { symbol: 'MSFT', price: '337.69', change: '+2.54', changePercent: '+0.76%' },
          { symbol: 'GOOGL', price: '139.93', change: '-0.87', changePercent: '-0.62%' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [symbols]);

  if (loading) return <div className="widget loading">Loading stocks...</div>;
  if (error) return <div className="widget error">{error}</div>;

  return (
    <div className="widget stocks-widget">
      <h3>Stock Ticker</h3>
      <div className="stock-list">
        {stocks.map((stock, index) => (
          <div key={index} className="stock-item">
            <span className="symbol">{stock.symbol}</span>
            <span className="price">${stock.price}</span>
            <span className={stock.change.startsWith('-') ? 'negative' : 'positive'}>
              {stock.change} ({stock.changePercent})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksWidget;