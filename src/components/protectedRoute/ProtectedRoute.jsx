// components/protectedRoute/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = true}) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className='perfumery-loading'>Загрузка...</div>;
  }

  // Если требуется авторизация, но пользователь не авторизован
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если не требуется авторизация, но пользователь авторизован
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;