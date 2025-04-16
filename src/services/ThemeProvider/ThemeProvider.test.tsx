import '@testing-library/jest-dom'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, useThemeProvider } from '@services'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    text: () => Promise.resolve(),
    status: 200,
    message: 'OK',
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('Test AuthProvider', () => {
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

  test('functionality of ThemeProvider hook, AltTheme switch', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      loadTheme: expect.any(Function),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.loadTheme('AltTheme')
    })
    expect(result.current.theme.name).toBe('AltTheme')
  })

  test('functionality of ThemeProvider hook, DarkTheme switch', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      loadTheme: expect.any(Function),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.loadTheme('DarkTheme')
    })
    expect(result.current.theme.name).toBe('DarkTheme')
  })

  test('functionality of ThemeProvider hook, default switch', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      loadTheme: expect.any(Function),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.loadTheme('some-theme')
    })
    expect(result.current.theme.name).toBe('HaskiTheme')
  })

  test('update user theme', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      loadTheme: expect.any(Function),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.updateTheme('DarkTheme')
    })
    expect(result.current.theme.name).toBe('DarkTheme')
  })

  test('getUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    await act(async () => {
      await result.current.loadTheme('some-theme')
    })

    expect(result.current.theme.name).toBe('HaskiTheme')
  })

  test('update user theme fails', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>

    const { result } = renderHook(() => useThemeProvider(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      loadTheme: expect.any(Function),
      updateTheme: expect.any(Function)
    })

    // test side effects
    act(() => {
      mockServices.fetchUser.mockImplementationOnce(() => {
        throw new Error('getUser error')
      })
      result.current.updateTheme('DarkTheme')
    })
    await waitFor(() => {
      expect(result.current.theme.name).toBe('DarkTheme')
    })
  })
})
