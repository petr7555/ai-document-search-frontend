import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import theme from '../themes/theme';
import { Container } from '@mui/material';
import { Column } from '../components/Column';
import { useState } from 'react';
import { authenticateUser } from '../utils/authenticateUser';
import { Alert, AlertTitle, Box } from '@mui/material';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const StyledPaper = styled(Paper)(() => ({
  width: '359px',
  height: '261px',
  display: 'flex',
  padding: '40px'
}));

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexGrow: 1,
  backgroundColor: theme.palette.info.main
}));

export const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const token = await authenticateUser(username, password);
      sessionStorage.setItem('token', token);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(true);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <StyledContainer>
        <StyledPaper elevation={3}>
          <Column>
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <ColorButton onClick={handleSubmit} variant="contained">
              Sign in
            </ColorButton>
          </Column>
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
      </StyledContainer>
    </Box>
  );
};
