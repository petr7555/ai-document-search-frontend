import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react';

type ErrorState = {
  error: string;
  autoHide: boolean;
};

type SetError = (error: string, autoHide?: boolean) => void;

type ErrorContextType = [ErrorState, SetError];

const ErrorContext = createContext<ErrorContextType>(undefined as never);

type Props = {
  children: ReactNode;
};

export const ErrorProvider: FC<Props> = ({ children }) => {
  const [errorState, setErrorState] = useState({
    error: '',
    autoHide: true
  });

  const setError = useCallback((error: string, autoHide = true) => {
    setErrorState({ error, autoHide });
  }, []);

  const errorContextValue: ErrorContextType = [errorState, setError];

  return (
    <ErrorContext.Provider value={errorContextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = (): ErrorContextType => useContext(ErrorContext);

export default useError;
