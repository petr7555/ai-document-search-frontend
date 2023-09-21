import { useContext } from 'react';
import { AuthContext } from '../auth/Authprovider2';

export const useAuth = () => {
  return useContext(AuthContext);
};
