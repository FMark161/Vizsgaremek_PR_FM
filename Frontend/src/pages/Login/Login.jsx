import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Töröljük a hibát amikor a felhasználó elkezd gépelni
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }
    
    if (!formData.password) {
      newErrors.password = 'A jelszó megadása kötelező';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
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
      // Sikeres bejelentkezés esetén átirányítás a főoldalra
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-page">
      {/* Hero szekció */}
      <section className="auth-hero">
        <div className="container">
          <h1>Bejelentkezés</h1>
          <p className="auth-hero-description">
            Jelentkezz be fiókodba, hogy hozzáférj a tananyagokhoz és kezelhesd jelentkezéseidet.
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <h2>Üdv újra itt!</h2>
              <p className="auth-subtitle">Jelentkezz be a folytatáshoz</p>
              
              <form onSubmit={handleSubmit} className="auth-form">
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

                <div className="auth-form-options">
                  <label className="auth-checkbox">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Emlékezz rám</span>
                  </label>
                  <Link to="/forgot-password" className="auth-forgot-link">
                    Elfelejtetted a jelszavad?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Még nincs fiókod?{' '}
                  <Link to="/register" className="auth-link">
                    Regisztrálj most
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

export default Login;