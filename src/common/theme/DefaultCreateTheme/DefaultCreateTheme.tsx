import { createTheme as DefaultCreateTheme } from '@mui/material/styles'

//from mui demo page
//Used for customizing the theme with a name property, for example a new breakpoint size xxl, xxxl etc.
declare module '@mui/material/styles' {
  interface Theme {
    name: string // Add the custom `name` property.
  }

  interface ThemeOptions {
    name: string
  }
}

export { DefaultCreateTheme as createTheme }
