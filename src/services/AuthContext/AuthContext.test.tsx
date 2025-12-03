import '@testing-library/jest-dom'
import { render, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import AuthContext, { AuthContextType } from './AuthContext'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('Test Authcontext [HASKI-REQ-0028]', () => {
  // render custom component
  const TestComponent = () => {
    const context = useContext(AuthContext)
    return (
      <>
        {context.isAuth ? (
          <button onClick={() => context.logout()}>Logout</button>
        ) : (
          <button onClick={() => context.setExpire(Math.round(new Date().getTime() / 1000) + 1000)}>Login</button>
        )}
      </>
    )
  }
  const providedContext = {
    isAuth: false,
    setExpire: jest.fn(),
    logout: jest.fn()
  } as AuthContextType
  it('should render unauthorized', () => {
    const renderResult = render(
      <AuthContext.Provider value={providedContext}>
        <TestComponent />
      </AuthContext.Provider>
    )
    expect(renderResult.getByText('Login')).toBeInTheDocument()
    renderResult.getByText('Login').click()
    expect(providedContext.setExpire).toBeCalled()
  })

  it('should render authorized', () => {
    const renderResult = render(
      <AuthContext.Provider value={{ ...providedContext, isAuth: true }}>
        <TestComponent />
      </AuthContext.Provider>
    )
    expect(renderResult.getByText('Logout')).toBeInTheDocument()
    renderResult.getByText('Logout').click()
    expect(providedContext.logout).toBeCalled()
  })

  it('should return the default props of AuthContext', () => {
    const context = renderHook(() => useContext(AuthContext))
    expect(context.result.current).toMatchObject({
      isAuth: false,
      setExpire: expect.any(Function),
      logout: expect.any(Function)
    })
  })

  test('should change isAuth to true', () => {
    const renderResult = render(
      <AuthContext.Provider value={{ ...providedContext }}>
        <TestComponent />
      </AuthContext.Provider>
    )
    renderResult.getByText('Login').click()
    expect(providedContext.setExpire).toBeCalled()
  })

  test('should change isAuth to false', () => {
    const context = renderHook(() => useContext(AuthContext))
    context.result.current.setExpire(0)
    expect(context.result.current.isAuth).toBe(false)
  })

  it('should call default logout', () => {
    const context = renderHook(() => useContext(AuthContext))
    context.result.current.logout()
  })
})
