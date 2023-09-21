import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Alert, AlertTitle, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { PrimaryButton } from '../components/Button/PrimaryButton';
import { CenterPageContent } from '../components/CenterPageContent';
import { authenticateUser } from '../utils/authenticateUser';

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

  const resetLoginForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async () => {
    try {
      const token = await authenticateUser(username, password);
      sessionStorage.setItem('token', token);
      
    } catch (error) {
      setError(true);
    } finally {
      resetLoginForm();
    }
  };

  return (
    <CenterPageContent>
      <StyledPaper elevation={3} sx={{ justifyContent: 'center' }}>
        <Stack direction={'column'} spacing={8} sx={{ flexGrow: 1 }}>
          <TextField
            label="Username"
            variant="standard"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            label="Password"
            variant="standard"
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
          sx={{ marginTop: '30px', width: '365px' }}
        >
          <AlertTitle>Error</AlertTitle>
        </Alert>
      )}
    </CenterPageContent>
  );
};
