import React from 'react'
import { ThemeProvider } from '@common/theme'
import ThemeContext from '../ThemeContext/ThemeContext'
import { useThemeProvider as _useThemeProvider } from './ThemeProvider.hooks'

type ThemeProviderComponentProps = {
  children: React.ReactNode
  useThemeProvider?: typeof _useThemeProvider
}

export const DefaultThemeProvider = ({
  children,
  useThemeProvider: useThemeProvider = _useThemeProvider
}: ThemeProviderComponentProps) => {
  const { theme, loadTheme, updateTheme } = useThemeProvider()

  return (
    <ThemeContext.Provider value={{ theme, loadTheme, updateTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
