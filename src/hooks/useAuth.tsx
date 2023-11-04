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
import { AccessToken, getAccessToken } from '../api/getAccessToken';
import { ApiResponse } from '../api/utils/apiResponse';
import { CHAT_PATH, LOGIN_PATH } from '../utils/constants';

type AuthContextType = {
  token: string | null;
  logIn: (
    username: string,
    password: string
  ) => Promise<ApiResponse<AccessToken>>;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>(undefined as never);

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage<string | null>('token', null);

  const logIn = useCallback(
    async (username: string, password: string) => {
      const response = await getAccessToken(username, password);
      if (response.ok) {
        setToken(response.data.access_token);
        navigate(CHAT_PATH);
      }
      return response;
    },
    [navigate, setToken]
  );

  const logOut = useCallback(() => {
    setToken(null);
    navigate(LOGIN_PATH);
  }, [setToken, navigate]);

  const value = useMemo(
    () => ({
      token,
      logIn,
      logOut
    }),
    [token, logIn, logOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
