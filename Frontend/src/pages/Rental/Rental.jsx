import { useState, useEffect } from 'react';
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

// Importáld a képeket
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

// Kép mapping a hangszer nevek alapján
const imageMap = {
  'Akusztikus zongora': akusztikus_zongora,
  'Digitális zongora': digitalis_zongora,
  'Akusztikus gitár': akusztikus_gitar,
  'Elektromos gitár': elektromos_gitar,
  'Hegedű': hegedu,
  'Cselló': csello,
  'Fuvola': fuvola,
  'Saxophon': szaxofon,
  'Akusztikus dob': akusztikus_dob,
  'Elektromos dob': elektromos_dob,
  'Énekóra (mikrofon + hangfal)': mikrofon,
  'Hárfa': harfa
};

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRentalForm, setShowRentalForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rentalFormData, setRentalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    duration: '1',
    acceptTerms: false
  });

  // Kategóriák listája
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

  // Hangszerek lekérése az adatbázisból
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/instruments');
        const data = await response.json();
        // Hozzáadjuk a képeket a hangszer adatokhoz
        const instrumentsWithImages = data.map(instrument => ({
          ...instrument,
          image: imageMap[instrument.name] || null
        }));
        setRentals(instrumentsWithImages);
      } catch (error) {
        console.error('Hiba a hangszerek lekérésekor:', error);
        setError('Nem sikerült betölteni a hangszereket.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

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

  const handleRentalSubmit = async (instrumentId) => {
    const instrument = rentals.find(i => i.id === instrumentId);
    const totalPrice = parseInt(rentalFormData.duration) * parseInt(instrument.rentalPrice.replace(/[^0-9]/g, ''));

    // Itt később a bejelentkezett diák ID-ja jön
    // Ideiglenesen hardcode-oljuk
    const diakId = 1; // Ez később a bejelentkezett felhasználó ID-ja lesz

    try {
      const response = await fetch(`http://localhost:5000/api/instruments/${instrumentId}/rental`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diakId: diakId,
          duration: rentalFormData.duration,
          megjegyzes: `Név: ${rentalFormData.name}, Email: ${rentalFormData.email}, Tel: ${rentalFormData.phone}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Sikeres kölcsönzés! 
        
Hangszer: ${instrument.name}
Oktató: ${instrument.teacher}
Időtartam: ${rentalFormData.duration} hónap
Teljes költség: ${totalPrice.toLocaleString()} Ft

Kollégánk hamarosan felveszi Önnel a kapcsolatot a pontos részletek egyeztetéséhez.`);

        // Frissítjük a listát (a hangszer státusza most már 'rented')
        setRentals(prev => prev.map(r =>
          r.id === instrumentId ? { ...r, status: 'rented' } : r
        ));
      } else {
        alert(`Hiba: ${data.error || 'Ismeretlen hiba'}`);
      }
    } catch (error) {
      console.error('Hiba a kölcsönzés során:', error);
      alert('Hálózati hiba történt. Kérlek próbáld újra később.');
    }

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

  if (loading) {
    return (
      <div className="rental">
        <div className="container">
          <div className="loading">Betöltés...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rental">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

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
                  {instrument.image ? (
                    <img src={instrument.image} alt={instrument.name} />
                  ) : (
                    <div className="no-image">Nincs kép</div>
                  )}
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
                    {instrument.status === 'rented' && instrument.returnDate && (
                      <div className="rental-info">
                        <FaCalendarAlt /> Visszavárható: {instrument.returnDate}
                      </div>
                    )}
                    {instrument.status === 'maintenance' && (
                      <div className="rental-info maintenance">
                        <FaTools /> Szervízben
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