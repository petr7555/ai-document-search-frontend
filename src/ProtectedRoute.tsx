import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth()?.user;

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
