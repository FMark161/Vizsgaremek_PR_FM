import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import './Events.css';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Események lekérése az API-ból
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Hiba az események lekérésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // URL paraméter ellenőrzése
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get('id');
    if (eventId) {
      const event = events.find(e => e.id === parseInt(eventId));
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [location, events]);

  const categories = [
    { id: 'all', name: 'Minden esemény' },
    { id: 'koncert', name: 'Koncert' },
    { id: 'nyiltnap', name: 'Nyílt nap' },
    { id: 'mesterkurzus', name: 'Mesterkurzus' },
    { id: 'tabor', name: 'Tábor' },
    { id: 'fesztival', name: 'Fesztivál' }
  ];

  // Dátum formázása
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['január', 'február', 'március', 'április', 'május', 'június', 
                   'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
    return `${date.getFullYear()}. ${months[date.getMonth()]} ${date.getDate()}.`;
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.kategoria === selectedCategory);

  // Rendezés dátum szerint (legközelebbi legyen elöl)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.datum);
    const dateB = new Date(b.datum);
    return dateA - dateB;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.history.pushState({}, '', `/events?id=${event.id}`);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    window.history.pushState({}, '', '/events');
  };

  if (loading) {
    return (
      <div className="events">
        <div className="container">
          <div className="loading">Betöltés...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="events">
      {/* Hero szekció */}
      <section className="events-hero">
        <div className="container">
          <h1>Események</h1>
          <p className="hero-description">
            Rendszeresen szervezünk koncerteket, nyílt napokat és mesterkurzusokat. 
            Tekintsd meg közelgő eseményeinket!
          </p>
        </div>
      </section>

      {/* Szűrők */}
      <section className="events-filter">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Események listája - KÉPEK NÉLKÜL */}
      <section className="events-list">
        <div className="container">
          <div className="events-grid">
            {sortedEvents.length > 0 ? (
              sortedEvents.map(event => (
                <div 
                  key={event.id} 
                  className="event-card no-image"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event-header">
                    <h3>{event.cim}</h3>
                    {event.kiemelt === 1 && <span className="featured-badge">Kiemelt</span>}
                  </div>
                  <div className="event-content">
                    <div className="event-meta">
                      <div className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{formatDate(event.datum)}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>{event.idopont}</span>
                      </div>
                      <div className="meta-item">
                        <FaMapMarkerAlt className="meta-icon" />
                        <span>{event.helyszin}</span>
                      </div>
                      <div className="meta-item">
                        <FaTag className="meta-icon" />
                        <span>{categories.find(c => c.id === event.kategoria)?.name || event.kategoria}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.leiras}</p>
                    <button className="btn-details">
                      Részletek
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-events">
                <p>Nincsenek események ebben a kategóriában.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Részletes nézet modal - CSAK BEZÁRÁS GOMBBAL */}
      {selectedEvent && (
        <div className="event-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-body">
              <h2>{selectedEvent.cim}</h2>
              {selectedEvent.kiemelt === 1 && <span className="modal-featured">Kiemelt esemény</span>}
              <div className="modal-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{formatDate(selectedEvent.datum)}</span>
                </div>
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <span>{selectedEvent.idopont}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{selectedEvent.helyszin}</span>
                </div>
              </div>
              <p className="modal-description">{selectedEvent.hosszuleiras || selectedEvent.leiras}</p>
              <div className="modal-footer single-button">
                <button className="btn-close" onClick={closeModal}>
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;