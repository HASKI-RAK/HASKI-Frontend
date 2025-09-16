import { createContext } from 'react'
import { Theme } from '@common/theme'
import { HaskiTheme } from '@common/utils'

export type ThemeContextType = {
  theme: Theme
  updateTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: HaskiTheme,
  updateTheme: () => undefined
})
export default ThemeContext
