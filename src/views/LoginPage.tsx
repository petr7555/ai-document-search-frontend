import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, AlertTitle, Paper, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PrimaryButton } from '../components/Button/PrimaryButton';
import { CenterPageContent } from '../components/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const hasError = errorMessage.length > 0;

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
      const response = await auth.login(username, password);
      if (!response.ok) {
        setErrorMessage(response.detail);
      }
    } else {
      setErrorMessage('Please provide username and password');
    }
    resetLoginForm();
  };

  return (
    <>
      <Navbar />
      <CenterPageContent>
        <Paper elevation={3} sx={{ padding: 8 }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={4} sx={{ width: 300 }}>
              <TextField
                error={hasError}
                label="Username"
                type="text"
                autoComplete="username"
                color={hasError ? 'error' : 'primary'}
                variant="standard"
                value={username}
                data-cy="username-text-field"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
              />
              <TextField
                error={hasError}
                label="Password"
                type="password"
                autoComplete="current-password"
                color={hasError ? 'error' : 'primary'}
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
              {hasError && (
                <Alert
                  variant="outlined"
                  severity="error"
                  onClose={() => setErrorMessage('')}
                >
                  <AlertTitle data-cy="error-alert-message">
                    {errorMessage}
                  </AlertTitle>
                </Alert>
              )}
            </Stack>
          </form>
        </Paper>
      </CenterPageContent>
    </>
  );
};
