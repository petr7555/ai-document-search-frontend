import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#7d4ce3',
      main: '#3f18aa',
      dark: '#17008f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#6d7078',
      main: '#13161c',
      dark: '#000000',
      contrastText: '#fff'
    },
    info: {
      main: '#0288d1',
      dark: '#eaeaea'
    },
    success: {
      main: '#fff'
    }
  }
});

export default theme;
