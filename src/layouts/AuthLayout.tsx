import { useOutlet } from 'react-router-dom';
import { AuthProvider } from '../auth/Authprovider2';

export const AuthLayout = () => {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
};
