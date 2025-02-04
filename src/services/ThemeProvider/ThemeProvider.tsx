import { ReactNode, useMemo } from 'react'
import { ThemeProvider } from '@common/theme'
import ThemeContext from '../ThemeContext/ThemeContext'
import { useThemeProvider as _useThemeProvider } from './ThemeProvider.hooks'

type ThemeProviderComponentProps = {
  children: ReactNode
  useThemeProvider?: typeof _useThemeProvider
}

export const DefaultThemeProvider = ({
  children,
  useThemeProvider = _useThemeProvider
}: ThemeProviderComponentProps) => {
  const { theme, loadTheme, updateTheme } = useThemeProvider()

  const contextValue = useMemo(() => ({ theme, loadTheme, updateTheme }), [theme, loadTheme, updateTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
