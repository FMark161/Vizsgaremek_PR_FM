import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';
import logo from '../../assets/logo.png';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const publicMenuItems = [
    { name: 'Kezdőlap', path: '/' },
    { name: 'Jelentkezés', path: '/application' },
    { name: 'Hangszerek', path: '/instruments' },
    { name: 'Események', path: '/events' },
    { name: 'Kapcsolat', path: '/contact' }
  ];

  const protectedMenuItems = [
    { name: 'Kölcsönzés', path: '/rental' },
    { name: 'Óráim', path: '/lessons' }
  ];

  const adminMenuItems = [
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
          {publicMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}

          {isAuthenticated && protectedMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}

          {isAuthenticated && user?.jogosultsag === 'admin' && adminMenuItems.map((item) => (
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
              <span className="user-role">
                {user?.jogosultsag === 'admin' ? 'Admin' : 
                 user?.jogosultsag === 'tanar' ? 'Tanár' : 'Diák'}
              </span>
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