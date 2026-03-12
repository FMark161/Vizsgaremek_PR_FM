import Navigation from '../Navigation/Navigation.jsx';
import Footer from '../Footer/Footer.jsx';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;