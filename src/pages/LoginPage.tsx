import React, { FormEvent, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Paper, Stack } from '@mui/material';
import LoginField from '../components/LoginField';
import { useAuth } from '../hooks/useAuth';
import useError from '../hooks/useError';
import usePageTitle from '../hooks/usePageTitle';

export const LoginPage = () => {
  usePageTitle('Login');

  const auth = useAuth();

  const [, setError] = useError();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

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
    } else {
      setUsernameTouched(true);
      setPasswordTouched(true);
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <Paper elevation={3} sx={{ padding: 6, width: '90vw', maxWidth: 440 }}>
      <form onSubmit={handleFormSubmit}>
        <Stack direction="column" spacing={3}>
          <LoginField
            label="Username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            touched={usernameTouched}
            onTouched={setUsernameTouched}
          />
          <LoginField
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            touched={passwordTouched}
            onTouched={setPasswordTouched}
          />
          <LoadingButton
            data-cy="login-button"
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
