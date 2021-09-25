import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    common: {
      black: '#2f2e33',
    },
    primary: {
      main: '#394f99',
    },
    secondary: {
      main: '#452c32',
    },
    error: {
      main: '#e7472d',
    },
    grey: {
      50: '#f1f2ed',
      100: '#e2e3de',
      200: '#d5d6d2',
      300: '#c8c9c5',
      400: '#bcbd89',
      500: '#afb0ac',
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontFamily: ['Roboto', 'Noto Sans JP', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(28),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(45),
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(24),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(32),
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(24),
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(16),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(20),
      },
    },
    body1: {
      lineHeight: 'inherit',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          lineHeight: '1.75',
          color: theme.palette.common.black,
          backgroundColor: theme.palette.grey[50],
        },
        ul: {
          listStyleType: 'none',
          margin: 0,
          padding: 0,
        },
        img: {
          verticalAlign: 'middle',
          maxWidth: '100%',
          height: 'auto',
        },
      },
    },
  },
});

export default theme;
