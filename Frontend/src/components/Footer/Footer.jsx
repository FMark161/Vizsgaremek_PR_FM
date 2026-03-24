import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Első oszlop - Elérhetőségek */}
                    <div className="footer-section">
                        <h3>Harmónia Zeneiskola</h3>
                        <p>Budapest, Jókai tér 1.</p>
                        <p>1061 Magyarország</p>
                        <p>Tel: +36 1 234 5678</p>
                        <p>Email: info@harmoniazeneiskola.hu</p>
                    </div>

                    {/* Második oszlop - Nyitvatartás */}
                    <div className="footer-section">
                        <h3>Nyitvatartás</h3>
                        <p>Hétfő - Péntek: 14:00 - 20:00</p>
                        <p>Szombat: 10:00 - 16:00</p>
                        <p>Vasárnap: Zárva</p>
                    </div>

                    {/* Harmadik oszlop - Gyorslinkek */}
                    {/* Harmadik oszlop - Gyorslinkek */}
                    <div className="footer-section">
                        <h3>Gyorslinkek</h3>
                        <ul className="footer-links">
                            <li><Link to="/application">Jelentkezés</Link></li>
                            <li><Link to="/instruments">Hangszerek</Link></li>
                            <li><Link to="/rental">Kölcsönzés</Link></li>
                            <li><Link to="/events">Események</Link></li>
                            <li><Link to="/lessons">Óráim</Link></li>
                            <li><Link to="/contact">Kapcsolat</Link></li>
                        </ul>
                    </div>

                    {/* Negyedik oszlop - Közösségi média */}
                    <div className="footer-section">
                        <h3>Kövess minket</h3>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
                        </div>
                    </div>
                </div>

                {/* Alsó rész - Copyright */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Harmónia Zeneiskola. Minden jog fenntartva.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;