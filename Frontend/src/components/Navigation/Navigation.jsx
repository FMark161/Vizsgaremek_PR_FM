import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navigation.css';
import logo from '../../assets/logo.png';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const menuItems = [
    { name: 'Kezdőlap', path: '/' },
    { name: 'Jelentkezés', path: '/application' },
    { name: 'Hangszerek', path: '/instruments' },
    { name: 'Kölcsönzés', path: '/rental' },
    { name: 'Események', path: '/events' },
    { name: 'Óráim', path: '/lessons' },
    { name: 'Kapcsolat', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Harmónia Zeneiskola" />
          <span>
            <span className="logo-highlight">Harmónia</span> Zeneiskola
          </span>
        </Link>

        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="user-profile">
              <span className="user-name">{user?.fnev}</span>
              <button onClick={logout} className="logout-btn">
                Kijelentkezés
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">
                Bejelentkezés
              </Link>
              <Link to="/register" className="btn btn-register">
                Regisztráció
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;