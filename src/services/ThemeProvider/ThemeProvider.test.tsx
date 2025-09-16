import '@testing-library/jest-dom'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, useThemeProvider } from '@services'
import { AltTheme, DarkTheme } from '@common/utils'
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

describe('ThemeProvider', () => {
  it('should include the standard useThemeProvider values', () => {
    const result = render(
      <MemoryRouter>
        <ThemeProvider>
          <>Test</>
        </ThemeProvider>
      </MemoryRouter>
    )
    expect(result.getByText('Test')).toBeInTheDocument()
  })

  it('should load AltTheme correctly using useThemeProvider hook', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.updateTheme(AltTheme)
    })
    expect(result.current.theme.name).toBe('AltTheme')
  })

  it('should load DarkTheme correctly using useThemeProvider hook', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.updateTheme(DarkTheme)
    })
    expect(result.current.theme.name).toBe('DarkTheme')
  })

  it('should load the default theme correctly using useThemeProvider hook', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.updateTheme(someTheme)
    })
    expect(result.current.theme.name).toBe('HaskiTheme')
  })

  test('loadTheme should fall back to default theme when fetchUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    await act(async () => {
      await result.current.updateTheme(someTheme)
    })

    expect(result.current.theme.name).toBe('HaskiTheme')
  })

  it('should update local theme even if user theme update fails', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.updateTheme(DarkTheme)
    })
    await waitFor(() => {
      expect(result.current.theme.name).toBe('DarkTheme')
    })
  })
})
