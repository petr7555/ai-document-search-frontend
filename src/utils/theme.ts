import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteColor {
    userMessage: string;
    botMessage: string;
  }

  interface SimplePaletteColorOptions {
    userMessage?: string;
    botMessage?: string;
  }
}

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
    mode: 'light'
  }
});

export default theme;
