import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { eventsData, getEventById } from '../../utils/eventsData';
import './Events.css';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const location = useLocation();

  // URL paraméter ellenőrzése
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get('id');
    if (eventId) {
      const event = getEventById(parseInt(eventId));
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [location]);

  const categories = [
    { id: 'all', name: 'Minden esemény' },
    { id: 'koncert', name: 'Koncert' },
    { id: 'nyiltnap', name: 'Nyílt nap' },
    { id: 'mesterkurzus', name: 'Mesterkurzus' },
    { id: 'tabor', name: 'Tábor' },
    { id: 'fesztival', name: 'Fesztivál' }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? eventsData
    : eventsData.filter(event => event.category === selectedCategory);

  // Rendezés dátum szerint (legközelebbi legyen elöl)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateA - dateB;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // URL frissítése, de nem tölti újra az oldalt
    window.history.pushState({}, '', `/events?id=${event.id}`);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    // Vissza az alap URL-re
    window.history.pushState({}, '', '/events');
  };

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

      {/* Események listája */}
      <section className="events-list">
        <div className="container">
          <div className="events-grid">
            {sortedEvents.map(event => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  {event.featured && <span className="featured-badge">Kiemelt</span>}
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <div className="meta-item">
                      <FaCalendarAlt className="meta-icon" />
                      <span>{event.date}</span>
                    </div>
                    <div className="meta-item">
                      <FaClock className="meta-icon" />
                      <span>{event.time}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt className="meta-icon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="meta-item">
                      <FaTag className="meta-icon" />
                      <span>{categories.find(c => c.id === event.category)?.name}</span>
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <button className="btn-details">
                    Részletek
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sortedEvents.length === 0 && (
            <div className="no-events">
              <p>Nincsenek események ebben a kategóriában.</p>
            </div>
          )}
        </div>
      </section>

      {/* Részletes nézet modal */}
      {selectedEvent && (
        <div className="event-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
            </div>
            <div className="modal-body">
              <h2>{selectedEvent.title}</h2>
              <div className="modal-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
              <p className="modal-description">{selectedEvent.longDescription}</p>
              <div className="modal-footer">
                <Link to="/application" className="btn-interest">
                  Érdekel a jelentkezés
                </Link>
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