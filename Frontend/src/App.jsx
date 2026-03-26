import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Layout from "./components/Layout/Layout.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

// Import oldalak
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
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Nyilvános oldalak - bárki láthatja */}
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Védett oldalak - csak bejelentkezett felhasználók */}
            <Route path="/rental" element={
              <ProtectedRoute allowedRoles={['diak', 'tanar', 'admin']}>
                <Rental />
              </ProtectedRoute>
            } />
            <Route path="/lessons" element={
              <ProtectedRoute allowedRoles={['diak', 'tanar', 'admin']}>
                <Lessons />
              </ProtectedRoute>
            } />

            {/* Admin oldal - csak adminok */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;