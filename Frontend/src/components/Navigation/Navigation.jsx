import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';
import logo from '../../assets/logo.png';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  // Nyilvános menüpontok
  const publicMenuItems = [
    { name: 'Kezdőlap', path: '/' },
    { name: 'Jelentkezés', path: '/application' },
    { name: 'Hangszerek', path: '/instruments' },
    { name: 'Események', path: '/events' },
    { name: 'Kapcsolat', path: '/contact' }
  ];

  // Védett menüpontok (csak bejelentkezetteknek)
  const protectedMenuItems = [
    { name: 'Kölcsönzés', path: '/rental' },
    { name: 'Óráim', path: '/lessons' }
  ];

  // Admin menüpont (csak adminoknak)
  const adminMenuItems = [
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Bal oldal - Logó és név */}
        <Link to="/" className="logo">
          <img src={logo} alt="Harmónia Zeneiskola" />
          <span>
            <span className="logo-highlight">Harmónia</span> Zeneiskola
          </span>
        </Link>

        {/* Középső - Menüpontok */}
        <ul className="nav-menu">
          {/* Nyilvános menüpontok */}
          {publicMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}

          {/* Védett menüpontok - csak bejelentkezve */}
          {isAuthenticated && protectedMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}

          {/* Admin menüpont - csak adminnak */}
          {isAuthenticated && user?.jogosultsag === 'admin' && adminMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Jobb oldal - Bejelentkezés/Regisztráció vagy Profil */}
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