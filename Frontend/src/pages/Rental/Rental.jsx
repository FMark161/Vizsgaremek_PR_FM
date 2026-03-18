import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaTools,
  FaChalkboardTeacher
} from 'react-icons/fa';
import './Rental.css';
import akusztikus_dob from '../../assets/rental/akusztikus_dob.jpg';
import akusztikus_gitar from '../../assets/rental/akusztikus_gitar.jpg';
import akusztikus_zongora from '../../assets/rental/akusztikus_zongora.jpg';
import csello from '../../assets/rental/csello.jpg';
import digitalis_zongora from '../../assets/rental/digitalis_zongora.jpg';
import elektromos_dob from '../../assets/rental/elektromos_dob.jpg';
import elektromos_gitar from '../../assets/rental/elektromos_gitar.jpg';
import fuvola from '../../assets/rental/fuvola.jpg';
import hegedu from '../../assets/rental/hegedu.jpg';
import mikrofon from '../../assets/rental/mikrofon.jpg';
import szaxofon from '../../assets/rental/szaxofon.jpg';
import harfa from '../../assets/rental/harfa.jpg';

const Rental = () => {
  const [rentals, setRentals] = useState([
    // Billentyűsök - van oktató
    {
      id: 1,
      name: 'Akusztikus zongora',
      category: 'Billentyűs',
      image: akusztikus_zongora,
      status: 'available',
      rentalPrice: '28 500 Ft/hó',
      teacher: 'Kovács Anna',
      teacherId: 1,
      returnDate: null
    },
    {
      id: 2,
      name: 'Digitális zongora',
      category: 'Billentyűs',
      image: digitalis_zongora,
      status: 'rented',
      rentalPrice: '22 500 Ft/hó',
      teacher: 'Kovács Anna',
      teacherId: 1,
      returnDate: '2024.04.15'
    },

    // Gitárok - van oktató
    {
      id: 3,
      name: 'Akusztikus gitár',
      category: 'Gitár',
      image: akusztikus_gitar,
      status: 'available',
      rentalPrice: '12 500 Ft/hó',
      teacher: 'Nagy Péter',
      teacherId: 2,
      returnDate: null
    },
    {
      id: 4,
      name: 'Elektromos gitár',
      category: 'Gitár',
      image: elektromos_gitar,
      status: 'maintenance',
      rentalPrice: '18 500 Ft/hó',
      teacher: 'Nagy Péter',
      teacherId: 2,
      returnDate: null
    },

    // Vonósok - van oktató
    {
      id: 5,
      name: 'Hegedű',
      category: 'Vonós',
      image: hegedu,
      status: 'available',
      rentalPrice: '15 500 Ft/hó',
      teacher: 'Szabó Márta',
      teacherId: 3,
      returnDate: null
    },
    {
      id: 6,
      name: 'Cselló',
      category: 'Vonós',
      image: csello,
      status: 'rented',
      rentalPrice: '22 500 Ft/hó',
      teacher: 'Szabó Márta',
      teacherId: 3,
      returnDate: '2024.04.20'
    },

    // Fúvósok - van oktató
    {
      id: 7,
      name: 'Fuvola',
      category: 'Fúvós',
      image: fuvola,
      status: 'available',
      rentalPrice: '14 500 Ft/hó',
      teacher: 'Kiss Éva',
      teacherId: 5,
      returnDate: null
    },
    {
      id: 8,
      name: 'Saxophon',
      category: 'Fúvós',
      image: szaxofon,
      status: 'available',
      rentalPrice: '24 500 Ft/hó',
      teacher: 'Kiss Éva',
      teacherId: 5,
      returnDate: null
    },

    // Ütősök - van oktató
    {
      id: 9,
      name: 'Akusztikus dob',
      category: 'Ütős',
      image: akusztikus_dob,
      status: 'available',
      rentalPrice: '32 500 Ft/hó',
      teacher: 'Takács Gábor',
      teacherId: 4,
      returnDate: null
    },
    {
      id: 10,
      name: 'Elektromos dob',
      category: 'Ütős',
      image: elektromos_dob,
      status: 'maintenance',
      rentalPrice: '28 500 Ft/hó',
      teacher: 'Takács Gábor',
      teacherId: 4,
      returnDate: '2024.04.30'
    },

    // Ének - van oktató
    {
      id: 11,
      name: 'Énekóra (mikrofon + hangfal)',
      category: 'Ének',
      image: mikrofon,
      status: 'available',
      rentalPrice: '16 500 Ft/hó',
      teacher: 'Molnár Dávid',
      teacherId: 6,
      returnDate: null
    },

    // Egyéb - van oktató
    {
      id: 12,
      name: 'Hárfa',
      category: 'Egyéb',
      image: harfa,
      status: 'rented',
      rentalPrice: '26 500 Ft/hó',
      teacher: 'Szabó Márta',
      teacherId: 3,
      returnDate: '2024.05.10'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRentalForm, setShowRentalForm] = useState(null);
  const [rentalFormData, setRentalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    duration: '1',
    acceptTerms: false
  });

  const categories = [
    { id: 'all', name: 'Összes hangszer' },
    { id: 'Billentyűs', name: 'Billentyűsök' },
    { id: 'Gitár', name: 'Gitárok' },
    { id: 'Vonós', name: 'Vonósok' },
    { id: 'Fúvós', name: 'Fúvósok' },
    { id: 'Ütős', name: 'Ütősök' },
    { id: 'Ének', name: 'Ének' },
    { id: 'Egyéb', name: 'Egyéb' }
  ];

  const filteredRentals = selectedCategory === 'all'
    ? rentals
    : rentals.filter(r => r.category === selectedCategory);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="status-badge available"><FaCheck /> Elérhető</span>;
      case 'rented':
        return <span className="status-badge rented"><FaTimes /> Kölcsönözve</span>;
      case 'maintenance':
        return <span className="status-badge maintenance"><FaTools /> Szervízben</span>;
      default:
        return null;
    }
  };

  const handleRentalSubmit = (instrumentId) => {
    const instrument = rentals.find(i => i.id === instrumentId);
    const totalPrice = parseInt(rentalFormData.duration) * parseInt(instrument.rentalPrice.replace(/[^0-9]/g, ''));

    alert(`Sikeres kölcsönzés! 
    
Hangszer: ${instrument.name}
Oktató: ${instrument.teacher}
Időtartam: ${rentalFormData.duration} hónap
Teljes költség: ${totalPrice.toLocaleString()} Ft

Kollégánk hamarosan felveszi Önnel a kapcsolatot a pontos részletek egyeztetéséhez.`);

    setShowRentalForm(null);
    setRentalFormData({
      name: '',
      email: '',
      phone: '',
      duration: '1',
      acceptTerms: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRentalFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="rental">
      {/* Hero szekció */}
      <section className="rental-hero">
        <div className="container">
          <h1>Hangszerkölcsönzés</h1>
          <p className="hero-description">
            Diákjaink számára kedvezményes áron biztosítjuk hangszereink kölcsönzését.
            Minden hangszerhez tapasztalt oktatót is ajánlunk!
          </p>
        </div>
      </section>

      {/* Szűrők */}
      <section className="rental-filter">
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

      {/* Hangszerek listája */}
      <section className="rental-list">
        <div className="container">
          <div className="instruments-grid">
            {filteredRentals.map(instrument => (
              <div key={instrument.id} className="instrument-card">
                <div className="instrument-image">
                  <img src={instrument.image} alt={instrument.name} />
                </div>

                <div className="instrument-content">
                  <div className="instrument-header">
                    <h3>{instrument.name}</h3>
                    <span className="instrument-category">{instrument.category}</span>
                  </div>

                  <div className="rental-teacher-info">
                    <FaChalkboardTeacher className="teacher-icon" />
                    <span>Oktató: <strong>{instrument.teacher}</strong></span>
                  </div>

                  <div className="status-section">
                    {getStatusBadge(instrument.status)}
                    {instrument.status === 'rented' && (
                      <div className="rental-info">
                        <FaCalendarAlt /> Visszavárható: {instrument.returnDate}
                      </div>
                    )}
                    {instrument.status === 'maintenance' && (
                      <div className="rental-info maintenance">
                        <FaTools /> Szervízben: {instrument.returnDate || 'Várhatóan hamarosan'}
                      </div>
                    )}
                  </div>

                  <div className="instrument-footer">
                    <div className="price">
                      <strong>{instrument.rentalPrice}</strong>
                    </div>

                    {instrument.status === 'available' && showRentalForm === instrument.id ? (
                      <div className="rental-form">
                        <h4>Kölcsönzési adatok</h4>
                        <input
                          type="text"
                          name="name"
                          placeholder="Teljes név"
                          value={rentalFormData.name}
                          onChange={handleChange}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email cím"
                          value={rentalFormData.email}
                          onChange={handleChange}
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Telefonszám"
                          value={rentalFormData.phone}
                          onChange={handleChange}
                        />
                        <select
                          name="duration"
                          value={rentalFormData.duration}
                          onChange={handleChange}
                        >
                          <option value="1">1 hónap</option>
                          <option value="3">3 hónap</option>
                          <option value="6">6 hónap</option>
                          <option value="12">12 hónap</option>
                        </select>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={rentalFormData.acceptTerms}
                            onChange={handleChange}
                          />
                          <span>Elfogadom a kölcsönzési feltételeket</span>
                        </label>
                        <div className="form-buttons">
                          <button
                            className="btn-submit"
                            onClick={() => handleRentalSubmit(instrument.id)}
                            disabled={!rentalFormData.name || !rentalFormData.email || !rentalFormData.phone || !rentalFormData.acceptTerms}
                          >
                            Megerősítés
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => setShowRentalForm(null)}
                          >
                            Mégse
                          </button>
                        </div>
                      </div>
                    ) : (
                      instrument.status === 'available' && (
                        <button
                          className="btn-rent"
                          onClick={() => setShowRentalForm(instrument.id)}
                        >
                          <FaShoppingCart /> Kölcsönzés
                        </button>
                      )
                    )}

                    {instrument.status !== 'available' && (
                      <button className="btn-rent disabled" disabled>
                        {instrument.status === 'rented' ? 'Kölcsönözve' : 'Szervízben'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Információs szekció */}
      <section className="rental-info-section">
        <div className="container">
          <div className="info-boxes">
            <div className="info-box">
              <FaCheck className="info-icon" />
              <h3>Csak diákjainknak</h3>
              <p>A hangszerkölcsönzés csak beiratkozott diákjaink számára elérhető.</p>
            </div>
            <div className="info-box">
              <FaChalkboardTeacher className="info-icon" />
              <h3>Oktatóval együtt</h3>
              <p>Minden hangszerhez ajánlunk egy tapasztalt oktatót is.</p>
            </div>
            <div className="info-box">
              <FaCalendarAlt className="info-icon" />
              <h3>Rugalmas időtartam</h3>
              <p>1-12 hónapig bérelheted a hangszereket, havonta újratölthető.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rental;