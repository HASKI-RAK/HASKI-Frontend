import { createTheme as DefaultCreateTheme } from '@mui/material/styles'

//from mui demo page
declare module '@mui/material/styles' {
  interface Theme {
    name: string // Add the custom `name` property.
  }

  interface ThemeOptions {
    name: string
  }
}

export { DefaultCreateTheme as createTheme }
