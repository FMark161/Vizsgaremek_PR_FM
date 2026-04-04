import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaUser,
  FaComment
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nev: formData.name,
          email: formData.email,
          telefon: formData.phone,
          targy: formData.subject,
          uzenet: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 5000);
      } else {
        setError(data.error || 'Hiba történt az üzenet küldése során');
      }
    } catch (error) {
      console.error('Hálózati hiba:', error);
      setError('Nem sikerült csatlakozni a szerverhez. Kérlek próbáld újra később.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Köszönjük az üzenetet!</h2>
            <p>Sikeresen elküldted üzeneted. Hamarosan válaszolunk rá.</p>
            <Link to="/" className="btn btn-primary">Vissza a kezdőlapra</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1>Kapcsolat</h1>
          <p className="hero-description">
            Keress minket bizalommal! Válaszolunk kérdéseidre, és segítünk a jelentkezésben.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Bal oldal - Elérhetőségek */}
            <div className="contact-info">
              <h2>Elérhetőségeink</h2>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h3>Cím</h3>
                  <p>Budapest, Jókai tér 1.</p>
                  <p>1061 Magyarország</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h3>Telefon</h3>
                  <p>+36 1 234 5678</p>
                  <p>Hétköznap 14:00 - 20:00</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>info@harmoniazeneiskola.hu</p>
                  <p>oktatas@harmoniazeneiskola.hu</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <h3>Nyitvatartás</h3>
                  <p>Hétfő - Péntek: 14:00 - 20:00</p>
                  <p>Szombat: 10:00 - 16:00</p>
                  <p>Vasárnap: Zárva</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Kövess minket</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <FaFacebook />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Jobb oldal - Űrlap */}
            <div className="contact-form-container">
              <h2>Írj nekünk</h2>
              <p className="form-subtitle">
                Küldd el üzeneted, és munkatársunk hamarosan felveszi veled a kapcsolatot.
              </p>
              
              {error && (
                <div className="error-message">{error}</div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" /> Név *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Írd be a neved"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" /> Email cím *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="pelda@email.hu"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" /> Telefonszám
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+36 30 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    Tárgy
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Mi ügyben keresel?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <FaComment className="input-icon" /> Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Írd meg üzeneted..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Küldés...' : 'Üzenet küldése'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Itt találsz minket</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.123456789!2d19.0538!3d47.5039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc123456789%3A0x123456789abcdef!2sBudapest%2C%20J%C3%B3kai%20t%C3%A9r%201%2C%201061!5e0!3m2!1shu!2shu!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harmónia Zeneiskola térkép"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;