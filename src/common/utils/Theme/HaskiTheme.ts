import { createTheme, yellow, red, green } from '@common/theme'

export const defaultBehavior = {
  boxShadowSize: {
    default: '2px 2px 0',
    large: '0 0.5rem 0 ',
    hidden: '0 0 0 0 '
  },
  border: {
    default: '2px solid '
  }
}

export const defaultFonts = {
  defaultFamily: 'din-round,sans-serif',
  default: '700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) din-round,sans-serif'
}

export const defaultColors = {
  primary: {
    //orange
    [100]: '#FF8E00', //light orange
    [300]: '#FD7702', //strong orange
    [900]: '#FF5003' //dark orange
  },
  secondary: {
    //blue
    [100]: '#003F7D', //blue
    [300]: '#003366', //blue, slightly darker
    [500]: '#002347' //blue, darker
  },

  lightgrey: 'lightgrey',
  white: 'white',
  black: '#000000'
}

export const HaskiTheme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
      dark: yellow[900],
      light: yellow[100]
    },
    secondary: {
      main: red[900],
      dark: defaultColors.primary[900],
      contrastText: defaultColors.black,
      light: defaultColors.black
    },
    success: {
      main: green[700],
      dark: '#000000',
      light: green[500]
    }

    /*action: {
      active: defaultColors.primary[100],
      
      hover: defaultColors.primary[100],
      hoverOpacity: 0.1,
      focus: defaultColors.primary[100],
      focusOpacity: 0.1,
      selected: defaultColors.primary[100],
      selectedOpacity: 1,
      
    },*/
  },

  typography: {
    fontFamily: ['Courier New', 'regular'].join(',')
  },

  components: {
    // Name of the component
    MuiFormHelperText: {
      defaultProps: {
        color: defaultColors.primary[300]
      },
      styleOverrides: {
        root: {
          color: 'red'
        },
        filled: {
          color: 'red'
        }
      }
    },
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
      //disables the ripple effect
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: defaultColors.lightgrey,
          /*font:
            "700 var(--web-ui_button-font-size,15px)/var(--web-ui_button-line-height,1.2) " +
            defaultFonts.default,*/
          font: 'Courier New',
          background: 'none',
          border: defaultBehavior.border.default + defaultColors.lightgrey,
          borderRadius: '0.2rem',
          backgroundColor: 'white',
          bottom: '-2px',
          //boxShadow: defaultBehavior.boxShadowSize["default"] + "lightgrey",
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
            boxShadow: 'unset',
            disableRipple: true
          }
        },
        //komplett gefüllter button
        contained: {
          color: defaultColors.black,
          backgroundColor: defaultColors.primary[100],
          boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.black,
          borderColor: defaultColors.black,
          '&:hover': {
            backgroundColor: defaultColors.primary[100],
            boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.secondary[500],
            borderColor: defaultColors.secondary[500],
            filter: 'var(--web-ui_button-filter-hover,brightness(1.1))'
          },
          '&:active': {
            //transform: "translateY(4px) translateZ(0)",
            boxShadow: 'unset'
          }
        },
        //Button wird unterstrichen
        outlined: {
          color: defaultColors.black,
          boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.white,
          borderColor: defaultColors.white,
          disableRipple: true,
          '&:hover': {
            textDecoration: 'underline #FF8E00',
            border: defaultBehavior.border['default'],
            boxShadow: defaultBehavior.boxShadowSize['default'] + defaultColors.white,
            borderColor: defaultColors.white,
            filter: 'var(--web-ui_button-filter-hover,brightness(1.1))'
          },
          '&:active': {
            //transform: "translateY(4px) translateZ(0)",
            boxShadow: 'unset'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          outlined: {
            color: defaultColors.black,
            '&:hover': {
              textDecoration: 'underline #FF8E00'
            }
          },
          contained: {
            color: defaultColors.black,
            '&:hover': {
              textDecoration: 'fill #FF8E00'
            }
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          font: 'Courier Prime',
          width: 32,
          height: 32,
          outline: '2px auto {defaultColors.black}',
          backgroundColor: defaultColors.white,

          color: defaultColors.black,
          '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2
          },
          '&:hover': {
            backgroundColor: defaultColors.lightgrey
          },
          '&:checked': {
            color: defaultColors.secondary[100],
            backgroundColor: defaultColors.secondary[100]
          },
          ':disabled': {
            color: defaultColors.lightgrey,
            cursor: 'not-allowed'
          }
        },
        colorSecondary: {
          color: defaultColors.secondary[100],
          '&$checked': {
            color: defaultColors.secondary[100]
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
