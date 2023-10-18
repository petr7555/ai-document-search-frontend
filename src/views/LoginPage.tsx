import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Grow,
  Paper,
  Snackbar,
  Stack
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { PrimaryButton } from '../components/Button/PrimaryButton';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetLoginForm = () => {
    setUsername('');
    setPassword('');
  };

  const isFormValid = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const response = await auth.login(username, password);
      if (!response.ok) {
        setErrorMessage(response.detail);
        setError(true);
        setLoading(false);
      }
    } else {
      setErrorMessage('Please provide username and password');
      setError(true);
    }
    resetLoginForm();
  };

  return (
    <>
      <Navbar />
      <CenterPageContent>
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <>
            <Paper elevation={3} sx={{ padding: 8 }}>
              <form onSubmit={handleSubmit}>
                <Stack
                  direction="column"
                  spacing={4}
                  sx={{
                    width: 400,
                    height: 275,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <TextField
                    error={error}
                    label="Username"
                    type="text"
                    autoComplete="username"
                    color={error ? 'error' : 'primary'}
                    variant="standard"
                    value={username}
                    data-cy="username-text-field"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <TextField
                    error={error}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    color={error ? 'error' : 'primary'}
                    value={password}
                    variant="standard"
                    data-cy="password-text-field"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <PrimaryButton
                    data-cy="sign-in-button"
                    variant="contained"
                    type="submit"
                  >
                    Sign in
                  </PrimaryButton>
                </Stack>
              </form>
            </Paper>
            <Snackbar
              open={error}
              autoHideDuration={4000}
              onClose={() => setError(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              transitionDuration={{ enter: 300, exit: 300 }}
              TransitionComponent={Grow}
            >
              <Alert variant="filled" severity="error">
                <AlertTitle data-cy="error-alert-message">
                  {errorMessage}
                </AlertTitle>
              </Alert>
            </Snackbar>
          </>
        )}
      </CenterPageContent>
    </>
  );
};
