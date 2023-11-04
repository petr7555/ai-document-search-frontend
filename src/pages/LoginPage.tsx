import React, { ChangeEvent, FormEvent, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Paper, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAuth } from '../hooks/useAuth';
import useError from '../hooks/useError';
import usePageTitle from '../hooks/usePageTitle';

export const LoginPage = () => {
  usePageTitle('Login');

  const auth = useAuth();

  const [, setError] = useError();

  const [loading, setLoading] = useState(false);

  // Username
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Password
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = username.length > 0 && password.length > 0;
    if (isFormValid) {
      setLoading(true);
      const response = await auth.logIn(username, password);
      if (!response.ok) {
        setError(response.detail);
      }
      setLoading(false);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    if (newUsername.length === 0) {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length === 0) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 6, width: '90vw', maxWidth: 440 }}>
      <form onSubmit={handleFormSubmit}>
        <Stack direction="column" spacing={3}>
          <TextField
            data-cy="username-input"
            label="Username"
            type="text"
            autoComplete="username"
            variant="standard"
            value={username}
            onChange={handleUsernameChange}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            data-cy="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <LoadingButton
            data-cy="log-in-button"
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              '&&': {
                mt: 6
              }
            }}
          >
            Log in
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
};
