import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'A név megadása kötelező';
    }
    
    if (!formData.email) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'A telefonszám megadása kötelező';
    }
    
    if (!formData.password) {
      newErrors.password = 'A jelszó megadása kötelező';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'A két jelszó nem egyezik';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'El kell fogadnod az adatvédelmi nyilatkozatot';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Itt lesz később a backend hívás
    setTimeout(() => {
      setIsLoading(false);
      // Sikeres regisztráció után átirányítás a bejelentkezés oldalra
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="auth-page">
      {/* Hero szekció */}
      <section className="auth-hero">
        <div className="container">
          <h1>Regisztráció</h1>
          <p className="auth-hero-description">
            Hozd létre fiókodat, és csatlakozz a Harmónia Zeneiskola közösségéhez!
          </p>
        </div>
      </section>

      {/* Register Form */}
      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <h2>Hozz létre fiókot</h2>
              <p className="auth-subtitle">Csatlakozz zenei közösségünkhöz</p>
              
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-group">
                  <label htmlFor="name">
                    <FaUser className="auth-input-icon" /> Teljes név
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Kovács János"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="auth-error-message">{errors.name}</span>}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="auth-input-icon" /> Email cím
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="pelda@email.hu"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="auth-error-message">{errors.email}</span>}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="phone">
                    <FaPhone className="auth-input-icon" /> Telefonszám
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+36 30 123 4567"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="auth-error-message">{errors.phone}</span>}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="password">
                    <FaLock className="auth-input-icon" /> Jelszó
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="auth-error-message">{errors.password}</span>}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="confirmPassword">
                    <FaLock className="auth-input-icon" /> Jelszó megerősítése
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="auth-error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="auth-form-group">
                  <label className="auth-checkbox">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    <span>
                      Elfogadom az <Link to="/terms" className="auth-link">Adatvédelmi nyilatkozatot</Link> és a <Link to="/terms" className="auth-link">Felhasználási feltételeket</Link>
                    </span>
                  </label>
                  {errors.acceptTerms && <span className="auth-error-message">{errors.acceptTerms}</span>}
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Regisztráció...' : 'Regisztráció'}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Már van fiókod?{' '}
                  <Link to="/login" className="auth-link">
                    Jelentkezz be
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;