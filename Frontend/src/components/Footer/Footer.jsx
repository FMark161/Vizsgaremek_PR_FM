import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user, isAuthenticated } = useAuth();

  const publicLinks = [
    { name: 'Kezdőlap', path: '/' },
    { name: 'Jelentkezés', path: '/application' },
    { name: 'Hangszerek', path: '/instruments' },
    { name: 'Események', path: '/events' },
    { name: 'Kapcsolat', path: '/contact' }
  ];

  const protectedLinks = [
    { name: 'Kölcsönzés', path: '/rental' },
    { name: 'Óráim', path: '/lessons' }
  ];

  const adminLinks = [
    { name: 'Admin', path: '/admin' }
  ];

  const getFooterLinks = () => {
    let links = [...publicLinks];
    
    if (isAuthenticated) {
      links = [...links, ...protectedLinks];
      
      if (user?.jogosultsag === 'admin') {
        links = [...links, ...adminLinks];
      }
    }
    
    return links;
  };

  const footerLinks = getFooterLinks();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Harmónia Zeneiskola</h3>
            <p>Budapest, Jókai tér 1.</p>
            <p>1061 Magyarország</p>
            <p>Tel: +36 1 234 5678</p>
            <p>Email: info@harmoniazeneiskola.hu</p>
          </div>

          <div className="footer-section">
            <h3>Nyitvatartás</h3>
            <p>Hétfő - Péntek: 14:00 - 20:00</p>
            <p>Szombat: 10:00 - 16:00</p>
            <p>Vasárnap: Zárva</p>
          </div>

          <div className="footer-section">
            <h3>Gyorslinkek</h3>
            <ul className="footer-links">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Kövess minket</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Harmónia Zeneiskola. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;