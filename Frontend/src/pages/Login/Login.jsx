import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fnev: '',
    jelszo: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fnev) {
      newErrors.fnev = 'A felhasználónév megadása kötelező';
    }
    
    if (!formData.jelszo) {
      newErrors.jelszo = 'A jelszó megadása kötelező';
    } else if (formData.jelszo.length < 6) {
      newErrors.jelszo = 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setServerError('');
    
    const result = await login(formData.fnev, formData.jelszo);
    
    if (result.success) {
      navigate('/');
    } else {
      setServerError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="container">
          <h1>Bejelentkezés</h1>
          <p className="auth-hero-description">
            Jelentkezz be fiókodba, hogy hozzáférj a tananyagokhoz és kezelhesd jelentkezéseidet.
          </p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <h2>Üdv újra itt!</h2>
              <p className="auth-subtitle">Jelentkezz be a folytatáshoz</p>
              
              {serverError && (
                <div className="auth-server-error">{serverError}</div>
              )}
              
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-group">
                  <label htmlFor="fnev">
                    <FaUser className="auth-input-icon" /> Felhasználónév
                  </label>
                  <input
                    type="text"
                    id="fnev"
                    name="fnev"
                    value={formData.fnev}
                    onChange={handleChange}
                    placeholder="felhasznalonev"
                    className={errors.fnev ? 'error' : ''}
                  />
                  {errors.fnev && <span className="auth-error-message">{errors.fnev}</span>}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="jelszo">
                    <FaLock className="auth-input-icon" /> Jelszó
                  </label>
                  <input
                    type="password"
                    id="jelszo"
                    name="jelszo"
                    value={formData.jelszo}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.jelszo ? 'error' : ''}
                  />
                  {errors.jelszo && <span className="auth-error-message">{errors.jelszo}</span>}
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