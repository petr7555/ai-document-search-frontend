import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const authContext = useAuth();

  if (!authContext.user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
