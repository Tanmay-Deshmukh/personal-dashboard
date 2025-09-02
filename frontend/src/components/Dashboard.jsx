import React, { useState } from 'react';
import WeatherWidget from './widgets/WeatherWidget';
import NewsWidget from './widgets/NewsWidget';
import FocusWidget from './widgets/FocusWidget';
import StocksWidget from './widgets/StocksWidget';
import CalendarWidget from './widgets/CalendarWidget';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [widgetLayout, setWidgetLayout] = useState({
    weather: true,
    news: true,
    focus: true,
    stocks: true,
    calendar: true
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Personal Dashboard</h1>
      </header>
      
      <div className="widgets-grid">
        {widgetLayout.weather && (
          <div className="widget-container">
            <WeatherWidget />
          </div>
        )}
        
        {widgetLayout.focus && (
          <div className="widget-container large">
            <FocusWidget />
          </div>
        )}
        
        {widgetLayout.stocks && (
          <div className="widget-container">
            <StocksWidget />
          </div>
        )}
        
        {widgetLayout.news && (
          <div className="widget-container large">
            <NewsWidget />
          </div>
        )}
        
        {widgetLayout.calendar && (
          <div className="widget-container large">
            {/* <CalendarWidget /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;