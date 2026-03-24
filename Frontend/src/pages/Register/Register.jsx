import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fnev: '',
    email: '',
    jelszo: '',
    confirmPassword: '',
    acceptTerms: false
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
    } else if (formData.fnev.length < 3) {
      newErrors.fnev = 'A felhasználónév legalább 3 karakter legyen';
    }

    if (!formData.email) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }

    if (!formData.jelszo) {
      newErrors.jelszo = 'A jelszó megadása kötelező';
    } else if (formData.jelszo.length < 6) {
      newErrors.jelszo = 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
    }

    if (formData.jelszo !== formData.confirmPassword) {
      newErrors.confirmPassword = 'A két jelszó nem egyezik';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'El kell fogadnod az adatvédelmi nyilatkozatot';
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

    const result = await register(formData.fnev, formData.jelszo, formData.email);

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
          <h1>Regisztráció</h1>
          <p className="auth-hero-description">
            Hozd létre fiókodat, és csatlakozz a Harmónia Zeneiskola közösségéhez!
          </p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <h2>Hozz létre fiókot</h2>
              <p className="auth-subtitle">Csatlakozz zenei közösségünkhöz</p>

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
                      Elfogadom az <Link to="/terms">Adatvédelmi nyilatkozatot</Link> és a <Link to="/terms">Felhasználási feltételeket</Link>
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