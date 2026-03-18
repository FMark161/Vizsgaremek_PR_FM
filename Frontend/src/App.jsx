import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importáld a ScrollToTop komponenst
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Layout
import Layout from "./components/Layout/Layout.jsx";

// Pages
import Home from "./pages/Home/Home.jsx";
import Application from "./pages/Application/Application.jsx";
import Instruments from "./pages/Instruments/Instruments.jsx";
import Rental from "./pages/Rental/Rental.jsx";
import Events from "./pages/Events/Events.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";

function App() {
  return (
    <Router>
      {/* ScrollToTop itt a Router-en belül, de a Layout-on kívül */}
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lessons" element={<Lessons />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;