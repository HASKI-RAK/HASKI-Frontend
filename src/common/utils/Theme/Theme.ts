import { createTheme } from '@mui/material/styles'
export const defaultBehavior = {
  boxShadowSize: {
    default: '0 2px 0 ',
    large: '0 0.5rem 0 ',
    hidden: '0 0 0 0 '
  },
  border: {
    default: '2px solid '
  }
}

export const defaultFonts = {
  defaultFamily: 'din-round,sans-serif',
  default:
    '700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) din-round,sans-serif'
}
export const defaultColors = {
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
  black: 'black'
}

export const Theme = createTheme({
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
  components: {
    // Name of the component
    MuiPaper: {
      // Name of the rule
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
        // Name of the slot
        root: {
          // Some CSS
          color: defaultColors.lightgrey,
          font:
            '700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) ' +
            defaultFonts.default,
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
          //padding: 'var(--web-ui_button-padding,0 16px)',
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

export const node_style = {
  display: 'flex',
  flexDirection: 'column',
  height: '100 %',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderImage: 'initial',
  borderColor: 'black',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px'
}

export const footer_style = {
  backgroundColor: '#FFCA3A',
  color: 'black',
  fontWeight: '400',
  textTransform: 'uppercase',
  fontFamily: 'monospace',
  fontSize: '10px',
  paddingInlineStart: '0.5rem',
  paddingInlineEnd: '0.5rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  borderTopWidth: '2px',
  borderTopStyle: 'solid',
  borderColor: 'black',
  flex: '1 1 0%'
}
export const header_style = {
  backgroundColor: '#FFCA3A',
  color: 'black',
  fontWeight: '400',
  textTransform: 'uppercase',
  fontFamily: 'monospace',
  fontSize: '10px',
  paddingInlineStart: '0.5rem',
  paddingInlineEnd: '0.5rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderColor: 'black',
  flex: '1 1 0%'
}

export const middle_style = {
  backgroundColor: '#FFCA3A',
  margin: '0rem',
  paddingTop: '0.1rem',
  paddingBottom: '0.1rem'
}

export const bottom_text = {
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.2rem'
}
export const bottom_text_right = {
  position: 'absolute',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.2rem',
  right: '0.5rem'
}
