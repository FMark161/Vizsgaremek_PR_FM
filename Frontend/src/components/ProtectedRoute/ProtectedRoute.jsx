import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Amíg ellenőrizzük a tokent, ne tegyünk semmit
  if (loading) {
    return <div className="loading">Betöltés...</div>;
  }

  // Ha nincs bejelentkezve, irányítsuk a bejelentkezésre
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Ha meg vannak adva jogosultságok, ellenőrizzük, hogy a felhasználó rendelkezik-e vele
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.jogosultsag)) {
    // Ha nincs jogosultsága, irányítsuk a főoldalra
    return <Navigate to="/" replace />;
  }

  // Ha minden rendben, jelenítsük meg az oldalt
  return children;
};

export default ProtectedRoute;