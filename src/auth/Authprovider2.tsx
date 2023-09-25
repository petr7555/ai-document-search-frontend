import { createContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../api/authenticateUser';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  user: Promise<string> | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(
    (username: string, password: string) => {
      const token = authenticateUser(username, password);
      token.then(function (value) {
        const response = JSON.parse(value);
        if (response.status == 200) {
          setUser(token);
          navigate('/', { replace: true });
        } else {
          alert('Login failed!');
        }
      });
    },
    [navigate, setUser]
  );

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [login, logout, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthContext;
