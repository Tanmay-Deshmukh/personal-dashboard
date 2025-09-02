import React, { useState, useEffect } from 'react';
import '../styles/Widget.css';

const CalendarWidget = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const API_URL = process.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}/api/calendar`);
        if (!response.ok) {
          throw new Error('Calendar data fetch failed');
        }
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError('Failed to load calendar events');
        // Fallback to demo data
        setEvents([
          {
            summary: "Team Meeting",
            start: { dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() },
            end: { dateTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString() }
          },
          {
            summary: "Lunch with Client",
            start: { dateTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString() },
            end: { dateTime: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString() }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarEvents();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="widget loading">Loading calendar...</div>;
  if (error) return <div className="widget error">{error}</div>;

  return (
    <div className="widget calendar-widget">
      <h3>Upcoming Events</h3>
      <div className="events-list">
        {events.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">
                {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
              </div>
              <div className="event-summary">{event.summary}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;