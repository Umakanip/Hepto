import { JSX } from 'react';
import { Navigate,useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'Admin' | 'User'; // Optional: restrict access by role
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps): JSX.Element {
const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!token) return <Navigate to="/login" state={{ from: location }} />;
  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
}
