import { ReactNode } from 'react'
import { ThemeProvider as DefaultThemeProvider } from '@common/theme'
import { ThemeContext, ThemeContextType } from '@services'
import { useThemeProvider as _useThemeProvider } from './ThemeProvider.hooks'

type ThemeProviderProps = {
  children: ReactNode
  useThemeProvider?: () => ThemeContextType
}

export const ThemeProvider = ({ children, useThemeProvider = _useThemeProvider }: ThemeProviderProps) => {
  const { theme } = useThemeProvider()

  return (
    <ThemeContext.Provider value={useThemeProvider()}>
      <DefaultThemeProvider theme={theme}>{children}</DefaultThemeProvider>
    </ThemeContext.Provider>
  )
}
