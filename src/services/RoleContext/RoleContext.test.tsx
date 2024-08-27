import '@testing-library/jest-dom'
import { render, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import RoleContext, { AuthContextType } from './RoleContext'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('Test Authcontext', () => {
  // render custom component
  const TestComponent = () => {
    const context = useContext(RoleContext)
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
      <RoleContext.Provider value={providedContext}>
        <TestComponent />
      </RoleContext.Provider>
    )
    expect(renderResult.getByText('Login')).toBeInTheDocument()
    renderResult.getByText('Login').click()
    expect(providedContext.setExpire).toBeCalled()
  })

  it('should render authorized', () => {
    const renderResult = render(
      <RoleContext.Provider value={{ ...providedContext, isAuth: true }}>
        <TestComponent />
      </RoleContext.Provider>
    )
    expect(renderResult.getByText('Logout')).toBeInTheDocument()
    renderResult.getByText('Logout').click()
    expect(providedContext.logout).toBeCalled()
  })

  it('should return the default props of AuthContext', () => {
    const context = renderHook(() => useContext(RoleContext))
    expect(context.result.current).toMatchObject({
      isAuth: false,
      setExpire: expect.any(Function),
      logout: expect.any(Function)
    })
  })

  test('should change isAuth to true', () => {
    const renderResult = render(
      <RoleContext.Provider value={{ ...providedContext }}>
        <TestComponent />
      </RoleContext.Provider>
    )
    renderResult.getByText('Login').click()
    expect(providedContext.setExpire).toBeCalled()
  })

  test('should change isAuth to false', () => {
    const context = renderHook(() => useContext(RoleContext))
    context.result.current.setExpire(0)
    expect(context.result.current.isAuth).toBe(false)
  })

  it('should call default logout', () => {
    const context = renderHook(() => useContext(RoleContext))
    context.result.current.logout()
  })
})
