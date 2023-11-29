'use client';

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    text: {
      primary: '#3D4042',
      secondary: '#848789',
    },
    background: {
      default: '#EDEDED',
    },
    custom: {
      white: '#FFFFFF',
      warning: '#cc3300',
      success: '#4BB543',
      hover: '#1565c0',
    },
    divider: '#EAEAEA',
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter',
    },
    h1: {
      fontSize: '42px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '32px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '24px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '20px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '22px',
      fontWeight: 500,
    },
    body2: {
      fontSize: '16px',
      fontWeight: 500,
    },
    caption: {
      fontSize: '16px',
    },
    button: {
      fontSize: '18px',
      textTransform: 'none',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { fontSize: 18 },
          '& .MuiInputLabel-root': { fontSize: 20 },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            outline: 'none',
          },
          '&.MuiTab-root': {
            outline: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            outline: 'none',
          },
        },
      },
    },
  },
});

export default customTheme;
