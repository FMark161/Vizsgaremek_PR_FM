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
      <div className="events-page">
        <div className="events-container">
          <div className="events-loading">Betöltés...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      {/* Hero szekció */}
      <section className="events-page-hero">
        <div className="events-container">
          <h1 className="events-page-title">Események</h1>
          <p className="events-page-description">
            Rendszeresen szervezünk koncerteket, nyílt napokat és mesterkurzusokat. 
            Tekintsd meg közelgő eseményeinket!
          </p>
        </div>
      </section>

      {/* Szűrők */}
      <section className="events-page-filter">
        <div className="events-container">
          <div className="events-category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`events-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Események listája */}
      <section className="events-page-list">
        <div className="events-container">
          <div className="events-page-grid">
            {sortedEvents.length > 0 ? (
              sortedEvents.map(event => (
                <div 
                  key={event.id} 
                  className="events-page-card"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="events-page-card-header">
                    <h3 className="events-page-card-title">{event.cim}</h3>
                    {event.kiemelt === 1 && <span className="events-page-featured-badge">Kiemelt</span>}
                  </div>
                  <div className="events-page-card-content">
                    <div className="events-page-card-meta">
                      <div className="events-page-meta-item">
                        <FaCalendarAlt className="events-page-meta-icon" />
                        <span>{formatDate(event.datum)}</span>
                      </div>
                      <div className="events-page-meta-item">
                        <FaClock className="events-page-meta-icon" />
                        <span>{event.idopont}</span>
                      </div>
                      <div className="events-page-meta-item">
                        <FaMapMarkerAlt className="events-page-meta-icon" />
                        <span>{event.helyszin}</span>
                      </div>
                      <div className="events-page-meta-item">
                        <FaTag className="events-page-meta-icon" />
                        <span>{categories.find(c => c.id === event.kategoria)?.name || event.kategoria}</span>
                      </div>
                    </div>
                    <p className="events-page-card-description">{event.leiras}</p>
                    <button className="events-page-details-btn">
                      Részletek
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="events-page-no-events">
                <p>Nincsenek események ebben a kategóriában.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Részletes nézet modal */}
      {selectedEvent && (
        <div className="events-page-modal" onClick={closeModal}>
          <div className="events-page-modal-content" onClick={e => e.stopPropagation()}>
            <button className="events-page-modal-close" onClick={closeModal}>×</button>
            <div className="events-page-modal-body">
              <h2 className="events-page-modal-title">{selectedEvent.cim}</h2>
              {selectedEvent.kiemelt === 1 && <span className="events-page-modal-featured">Kiemelt esemény</span>}
              <div className="events-page-modal-meta">
                <div className="events-page-meta-item">
                  <FaCalendarAlt className="events-page-meta-icon" />
                  <span>{formatDate(selectedEvent.datum)}</span>
                </div>
                <div className="events-page-meta-item">
                  <FaClock className="events-page-meta-icon" />
                  <span>{selectedEvent.idopont}</span>
                </div>
                <div className="events-page-meta-item">
                  <FaMapMarkerAlt className="events-page-meta-icon" />
                  <span>{selectedEvent.helyszin}</span>
                </div>
              </div>
              <p className="events-page-modal-description">{selectedEvent.hosszuleiras || selectedEvent.leiras}</p>
              <div className="events-page-modal-footer">
                <button className="events-page-modal-close-btn" onClick={closeModal}>
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