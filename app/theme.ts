'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D2340',
      light: '#1a3a6b',
      dark: '#071526',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F8F8F8',
      light: '#ffffff',
      dark: '#d5d5d5',
      contrastText: '#0D2340',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), var(--font-manrope), sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
});

export default theme;