import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import theme from '../themes/theme';
import { Container } from '@mui/material';
import { Column } from '../components/Column';

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
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}));

export const LoginPage = () => {
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Column>
          <TextField id="standard-basic" label="Username" variant="standard" />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <ColorButton variant="contained">Sign in</ColorButton>
        </Column>
      </StyledPaper>
    </StyledContainer>
  );
};
