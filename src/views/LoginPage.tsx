import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Alert, AlertTitle, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { PrimaryButton } from '../components/Button/PrimaryButton';
import { CenterPageContent } from '../components/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/useAuth';

const StyledPaper = styled(Paper)(() => ({
  width: '359px',
  height: '261px',
  display: 'flex',
  padding: '40px'
}));

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const auth = useAuth();

  const resetLoginForm = () => {
    setUsername('');
    setPassword('');
  };

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = () => {
    try {
      if (validateForm()) {
        auth?.login(username, password);
        resetLoginForm();
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      resetLoginForm();
    }
  };

  return (
    <>
      <Navbar />
      <CenterPageContent>
        <StyledPaper elevation={3} sx={{ justifyContent: 'center' }}>
          <Stack direction={'column'} spacing={8} sx={{ flexGrow: 1 }}>
            <TextField
              error={error}
              label="Username"
              color={error ? 'error' : 'primary'}
              variant="standard"
              value={username}
              cy-data="username-text-field"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              error={error}
              label="Password"
              color={error ? 'error' : 'primary'}
              type="password"
              value={password}
              variant="standard"
              cy-data="password-text-field"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <PrimaryButton onClick={handleSubmit} variant="contained">
              Sign in
            </PrimaryButton>
          </Stack>
        </StyledPaper>
        {error && (
          <Alert
            variant="outlined"
            severity="error"
            onClose={() => setError(false)}
            sx={{
              marginTop: '30px',
              width: '365px',
              position: 'fixed',
              bottom: 220
            }}
          >
            <AlertTitle>Please write username and password</AlertTitle>
          </Alert>
        )}
      </CenterPageContent>
    </>
  );
};
