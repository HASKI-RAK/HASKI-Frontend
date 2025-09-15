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
    [100]: '#E4C2A2FF', //pastel orange
    [300]: '#003366', //blue, slightly darker
    [500]: '#002347' //blue, darker
  },

  lightgrey: 'lightgrey',
  darkgrey: 'darkgrey',
  white: 'white',
  black: '#000000'
}

export const DarkTheme = createTheme({
  name: 'DarkTheme',
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
      default: '#272727',
      paper: '#676666'
    },
    text: {
      primary: '#FFFFFF',
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
    fontFamily: ['Courier New', 'regular'].join(','),
    allVariants: {
      color: '#FFFFFF'
    }
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
          border: defaultBehavior.border.default + defaultColors.lightgrey,
          borderRadius: '1rem',
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
          color: defaultColors.white,
          font: 'Courier New',
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
            backgroundColor: 'white'
          },
          '&:active': {
            transform: 'translateY(4px) translateZ(0)',
            boxShadow: 'unset',
            disableRipple: true
          },
          '&:disabled': {
            color: defaultColors.lightgrey,
            backgroundColor: defaultColors.darkgrey,
            boxShadow: 'none'
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
            boxShadow: 'unset',
            color: defaultColors.white,
            backgroundColor: defaultColors.primary[300],
            textDecoration: 'underline'
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
          boxShadow: defaultBehavior.boxShadowSize['default'] + 'lightgrey',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            borderRadius: '1rem',
            border: defaultBehavior.border.default + defaultColors.lightgrey,
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
          outline: '2px auto {defaultColors.lightgrey}',
          color: defaultColors.white,
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
          '.Mui-disabled&': {
            color: defaultColors.lightgrey,
            cursor: 'not-allowed'
          }
        },
        colorSecondary: {
          color: defaultColors.secondary[100],
          '&$checked': {
            color: defaultColors.secondary[100]
          },
          '&$disabled': {
            color: defaultColors.white,
            cursor: 'not-allowed'
          }
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.lightgrey
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '& .Mui-disabled': {
            color: defaultColors.secondary[100]
          }
        },
        label: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.darkgrey
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.lightgrey
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        },
        outlined: {
          // This ensures the outline is white
          color: defaultColors.white
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.lightgrey
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.lightgrey
          },
          '&:hover': {
            backgroundColor: defaultColors.lightgrey,
            borderRadius: '50%'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: defaultColors.white,
          '&.Mui-disabled': {
            color: defaultColors.lightgrey
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: defaultColors.white
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: defaultColors.white
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
