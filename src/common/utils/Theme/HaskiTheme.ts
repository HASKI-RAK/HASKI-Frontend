import { createTheme, green, grey, red, yellow } from '@common/theme'
import { defaultBehavior } from './CommonThemeSettings'

const defaultColors = {
  primary: {
    //orange
    [100]: '#FF8E00', //light orange
    [300]: '#FD7702', //strong orange
    [900]: '#FF5003' //dark orange
  },
  secondary: {
    //blue
    [100]: '#E4C2A2FF', //lightgrey
    [300]: '#003366', //blue, slightly darker
    [500]: '#002347' //blue, darker
  },

  lightgrey: 'lightgrey',
  darkgrey: 'darkgrey',
  white: 'white',
  black: '#000000'
}

export const HaskiTheme = createTheme({
  name: 'HaskiTheme',
  palette: {
    primary: {
      main: yellow[900],
      dark: yellow[900],
      light: yellow[100]
    },
    secondary: {
      main: red[900],
      dark: '#a8a8a8',
      contrastText: defaultColors.black,
      light: defaultColors.secondary[100]
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: '#6b3b13'
    },
    success: {
      main: green[600],
      dark: green[900],
      light: green[300]
    },
    warning: {
      main: yellow[700],
      dark: yellow[900],
      light: yellow[300]
    },
    error: {
      main: red[700],
      dark: red[900],
      light: red[300]
    },
    info: {
      main: grey[700],
      dark: grey[500],
      light: grey[200]
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

  typography: {
    fontFamily: ['Courier New', 'regular'].join(',')
  },

  components: {
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
        root: {
          color: defaultColors.lightgrey,
          font: 'Courier New',
          background: 'none',
          border: defaultBehavior.border.default + defaultColors.lightgrey,
          borderRadius: '0.2rem',
          backgroundColor: 'white',
          bottom: '-2px',
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
            boxShadow: 'unset',
            disableRipple: true
          }
        },
        //filled button
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
            boxShadow: 'unset'
          }
        },
        //underlined button
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
            boxShadow: 'unset'
          }
        },
        //filled button in white
        text: {
          background: 'none',
          color: defaultColors.black,
          border: 'none',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          lineHeight: '1rem',
          textDecoration: 'none',
          opacity: 0.7,
          ':hover': {
            opacity: 1
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
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: defaultColors.white,
          boxShadow: defaultBehavior.boxShadowSize['default'] + 'lightgrey',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            borderRadius: '1rem',
            border: defaultBehavior.border.default + defaultColors.lightgrey,
            color: defaultColors.black,
            backgroundColor: defaultColors.white,
            boxShadow: defaultBehavior.boxShadowSize['default'] + 'lightgrey'
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
          '.Mui-disabled &': {
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
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: defaultColors.white,
          '& .Mui-disabled': {
            backgroundColor: defaultColors.lightgrey,
            borderColor: defaultColors.darkgrey
          },
          '& .MuiToggleButton-root': {
            color: defaultColors.black,
            '&.Mui-selected': {
              color: defaultColors.black,
              backgroundColor: defaultColors.secondary['100']
            },
            '&:hover': {
              backgroundColor: defaultColors.secondary['100']
            }
          }
        }
      }
    }
  }
})
