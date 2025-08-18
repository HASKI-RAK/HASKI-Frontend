import { createTheme } from '@common/theme'
import { defaultBehavior } from './CommonThemeSettings'

// Module needs to be declared once in react, so that other component can use the new Breakpoints
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true // adds the `xxl` breakpoint
    xxxl: true
  }
}

export const defaultFonts = {
  defaultFamily: 'din-round,sans-serif',
  default: '700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) din-round,sans-serif'
}

const defaultColors = {
  primary: {
    900: '#45A2EF', // haski blue
    800: '#1277ca' // haski dark blue
  },
  secondary: {
    900: '#ffffff', // white
    100: '#333333' // dark grey
  },
  lightgrey: 'lightgrey',
  white: 'white',
  black: 'black',
  boxcolor: 'white'
}

export const ClassicTheme = createTheme({
  name: 'ClassicTheme',
  palette: {
    primary: {
      main: defaultColors.primary[900],
      dark: defaultColors.primary[800],
      light: '#a4dddf'
    },
    secondary: {
      main: defaultColors.secondary[900],
      dark: defaultColors.primary[800],
      contrastText: defaultColors.black,
      light: defaultColors.black
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000,
      xxxl: 2500
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          border: defaultBehavior.border.default + defaultColors.lightgrey,
          borderRadius: '1rem',
          color: defaultColors.black, // text color
          boxShadow: defaultBehavior.boxShadowSize['default'] + 'lightgrey'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: defaultColors.lightgrey,
          font: '700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) ' + defaultFonts.default,
          background: 'none',
          border: defaultBehavior.border.default + defaultColors.lightgrey,
          borderRadius: '1rem',
          backgroundColor: 'white',
          bottom: '-2px',
          boxShadow: defaultBehavior.boxShadowSize['default'] + 'lightgrey',
          left: '-2px',
          top: '-2px',
          padding: '0.5rem 1.2rem 0.5rem 1.2rem',
          transition: 'filter 0.1s ease',
          '&:hover': {
            filter: 'var(--web-ui_button-filter-hover,brightness(1.1))',
            backgroundColor: 'inherit'
          },
          '&:active': {
            transform: 'translateY(4px) translateZ(0)',
            boxShadow: 'unset'
          }
        },
        contained: {
          color: defaultColors.white,
          backgroundColor: defaultColors.primary[900],
          boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.primary[800],
          borderColor: defaultColors.primary[800],
          '&:hover': {
            backgroundColor: defaultColors.primary[900],
            boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.primary[800],
            borderColor: defaultColors.primary[800],
            filter: 'var(--web-ui_button-filter-hover,brightness(1.1))'
          },
          '&:active': {
            transform: 'translateY(4px) translateZ(0)',
            boxShadow: 'unset'
          }
        },
        outlined: {
          color: defaultColors.primary[900],
          boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.primary[800],
          borderColor: defaultColors.primary[800],
          '&:hover': {
            border: defaultBehavior.border['default'],
            boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.primary[800],
            borderColor: defaultColors.primary[800],
            filter: 'var(--web-ui_button-filter-hover,brightness(1.1))'
          },
          '&:active': {
            transform: 'translateY(4px) translateZ(0)',
            boxShadow: 'unset'
          }
        }
      }
    }
  }
})
