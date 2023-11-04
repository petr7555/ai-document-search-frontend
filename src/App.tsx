import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import RoutesSwitch from './components/RoutesSwitch';
import { AuthProvider } from './hooks/useAuth';
import { ErrorProvider } from './hooks/useError';
import theme from './utils/theme';

const App = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <BrowserRouter>
            <AuthProvider>
              <Layout>
                <RoutesSwitch />
              </Layout>
            </AuthProvider>
          </BrowserRouter>
        </ErrorProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
