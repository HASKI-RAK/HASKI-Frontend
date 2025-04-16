import { Theme } from '@mui/material/styles'
import { createContext } from 'react'
import { HaskiTheme } from '@common/utils'

export type ThemeContextType = {
  theme: Theme
  loadTheme: (themeName: string) => void
  updateTheme: (themeName: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: HaskiTheme,
  loadTheme: () => undefined,
  updateTheme: () => undefined
})

export default ThemeContext
