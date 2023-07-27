import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
  },
  palette: {
    primary: {
      50: '#B7D0ED',
      100: '#C2E0FF',
      200: '#99CCF3',
      300: '#66B2FF',
      400: '#3399FF',
      500: '#007FFF',
      600: '#0072E5',
      700: '#0059B2',
      800: '#004C99',
      900: '#003A75',
      main: '#007FFF',
      light: '#66B2FF',
      dark: '#0059B2'
    },
    secondary: {
      50: '#E1F5FE',
      100: '#B3E5FC',
      200: '#81D4FA',
      300: '#4FC3F7',
      400: '#29B6F6',
      500: '#03A9F4',
      600: '#039BE5',
      700: '#0288D1',
      800: '#0277BD',
      900: '#01579B',
      dark: '#0091EA',
      light: '#40C4FF',
      main: '#4FC3F7'
    },
    error: {
      50: '#FFF0F1',
      100: '#FFDBDE',
      200: '#FFBDC2',
      300: '#FF99A2',
      400: '#FF7A86',
      500: '#FF505F',
      600: '#EB0014',
      700: '#C70011',
      800: '#94000D',
      900: '#570007',
      main: '#EB0014',
      light: '#FF99A2',
      dark: '#C70011'
    },
    success: {
      50: '#E9FBF0',
      100: '#C6F6D9',
      200: '#9AEFBC',
      300: '#6AE79C',
      400: '#3EE07F',
      500: '#21CC66',
      600: '#1DB45A',
      700: '#1AA251',
      800: '#178D46',
      900: '#0F5C2E',
      dark: '#1AA251',
      light: '#6AE79C',
      main: '#1AA251'
    },
    grey: {
      50: '#F3F6F9',
      100: '#E5EAF2',
      200: '#DAE2ED',
      300: '#C7D0DD',
      400: '#B0B8C4',
      500: '#9DA8B7',
      600: '#6B7A90',
      700: '#434D5B',
      800: '#303740',
      900: '#1C2025'
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F3F6F9',
          color: '#1C2025',
          height: '100vh'
        },
        '#root': {
          height: '100%'
        },
        p: {
          margin: 0
        }
      }
    }
  }
});

export const sizes = {
  0: {
    px: '0px',
    rem: '0rem'
  },
  4: {
    px: '4px',
    rem: '0.25rem'
  },
  8: {
    px: '8px',
    rem: '0.5rem'
  },
  16: {
    px: '16px',
    rem: '1rem'
  },
  32: {
    px: '32px',
    rem: '2rem'
  },
  64: {
    px: '64px',
    rem: '4rem'
  }
};
