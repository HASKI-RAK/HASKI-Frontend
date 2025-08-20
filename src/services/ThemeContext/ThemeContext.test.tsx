// ThemeContext.test.tsx
import { render } from '@testing-library/react'
import React, { useContext } from 'react'
import { HaskiTheme } from '@common/utils'
import ThemeContext, { ThemeContextType } from './ThemeContext'
import { createTheme } from '@common/theme'

const someThemeLiteral = {
  name: 'mockTheme',
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#fff' }
  }
} as const

// Build a "real" mockTheme
const someTheme = createTheme(someThemeLiteral as any)

describe('ThemeContext', () => {
  it('should provide default values when no provider is used', () => {
    let contextValue: ThemeContextType | undefined

    // A simple test component that consumes the ThemeContext.
    const TestComponent: React.FC = () => {
      contextValue = useContext(ThemeContext)
      return null
    }

    // Render without a provider so that the default context value is used.
    render(<TestComponent />)

    // Verify that the default theme is HaskiTheme.
    expect(contextValue).toBeDefined()
    expect(contextValue!.theme).toBe(HaskiTheme)
    // Verify that loadTheme and updateTheme are functions.
    expect(typeof contextValue!.updateTheme).toBe('function')
    // Calling these functions should return undefined.
    expect(contextValue!.updateTheme(someTheme)).toBeUndefined()
  })

  it('should override context values when a provider is used', () => {
    // Create some custom values to phrovide.
    const customTheme = { palette: { primary: { main: '#000000' } } } as any // example custom theme
    const updateThemeMock = jest.fn()

    const customContextValue: ThemeContextType = {
      theme: customTheme,
      updateTheme: updateThemeMock
    }

    let contextValue: ThemeContextType | undefined

    // A test component that consumes the ThemeContext.
    const TestComponent: React.FC = () => {
      contextValue = useContext(ThemeContext)
      return null
    }

    // Render with a provider that supplies custom values.
    render(
      <ThemeContext.Provider value={customContextValue}>
        <TestComponent />
      </ThemeContext.Provider>
    )

    // Verify that the context values match the custom provider's value.
    expect(contextValue).toBeDefined()
    expect(contextValue!.theme).toBe(customTheme)
    expect(contextValue!.updateTheme).toBe(updateThemeMock)

    // When the functions are called, they should call the corresponding mocks.
    contextValue!.updateTheme(someTheme)
    expect(updateThemeMock).toHaveBeenCalledWith(someTheme)
  })
})
