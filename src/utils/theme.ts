import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3f18aa'
    },
    secondary: {
      main: '#13161c'
    },
    background: {
      default: '#eaeaea'
    },
    text: {
      secondary: 'rgba(0, 0, 0, 0.71)'
    },
    mode: 'light'
  }
});

export default theme;
