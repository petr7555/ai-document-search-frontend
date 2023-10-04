import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { authenticateUser, AuthResponse } from '../api/authenticateUser';

type AuthContextType = {
  user?: string;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
};

const AuthContext = createContext(null as unknown as AuthContextType);

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<string | undefined>(
    'user',
    undefined
  );
  const [token, setToken] = useLocalStorage<string | undefined>(
    'token',
    undefined
  );
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(
    async (username: string, password: string) => {
      const response = await authenticateUser(username, password);
      if (response.ok) {
        setUser(username);
        setToken(response.access_token);
        navigate('/', { replace: true });
      }
      return response;
    },
    [setUser, setToken, navigate]
  );

  // call this function to sign out logged-in user
  const logout = useCallback(() => {
    setUser(undefined);
    setToken(undefined);
    navigate('/', { replace: true });
  }, [setUser, setToken, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      token
    }),
    [user, login, logout, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
