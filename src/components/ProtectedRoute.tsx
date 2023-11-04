import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LOGIN_PATH } from '../utils/constants';

type Props = {
  children: ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to={LOGIN_PATH} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
