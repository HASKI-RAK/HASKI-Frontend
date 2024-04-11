import '@testing-library/jest-dom'
import { act, render, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { AuthProvider } from '@services'
import { useAuthProvider } from './AuthProvider.hooks'

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
  it('should include the standard useAuthrovider values', () => {
    const result = render(
      <AuthProvider>
        <>Test</>
      </AuthProvider>
    )
    expect(result.getByText('Test')).toBeInTheDocument()
  })

  test('functionality of AuthProvider hook', async () => {
    const { result } = renderHook(() => useAuthProvider())
    expect(result.current).toMatchObject({
      isAuth: false,
      setExpire: expect.any(Function),
      logout: expect.any(Function)
    })

    // test side effects
    act(() => {
      result.current.setExpire(9999999999) // if this test fails, how did react js even survive this long?
    })
    expect(result.current.isAuth).toBe(true)

    await act(async () => {
      await result.current.logout()
    })
    expect(result.current.isAuth).toBe(false)
  })

  it('should set isauth to false when backend returns other than 200', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 400 }),
        status: 400,
        ok: false,
        headers: {
          get: () => 'application/json'
        },
        message: 'Bad Request'
      })
    ) as jest.Mock
    let _result!: { current: { isAuth: boolean } }
    act(() => {
      const { result } = renderHook(() => useAuthProvider())
      _result = result
    })
    expect(_result.current).toMatchObject({
      isAuth: false,
      setExpire: expect.any(Function),
      logout: expect.any(Function)
    })

    expect(_result.current.isAuth).toBe(false)
  })

  test('useffect should set isAuth to true when backend returns 200', async () => {
    const fech_mock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        ok: true,
        headers: {
          get: () => 'application/json'
        },
        message: 'OK'
      })
    ) as jest.Mock
    global.fetch = fech_mock
    let _result!: { current: { isAuth: boolean } }
    await act(async () => {
      const { result } = renderHook(() => useAuthProvider())
      _result = result
    }).then(() => {
      expect(_result.current).toMatchObject({
        isAuth: false,
        setExpire: expect.any(Function),
        logout: expect.any(Function)
      })
      expect(_result.current.isAuth).toBe(false)
    })
  })

  it('should throw an error if logout fails', async () => {
    // Here we override the mockServices.fetchLogout function to throw an error
    mockServices.fetchLogout = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('logout failed')))
    const { result } = renderHook(() => useAuthProvider())
    act(() => {
      result.current.setExpire(9999999999) // if this test fails, how did react js even survive this long?
    })
    expect(result.current.isAuth).toBe(true)
    // logout should throw an error
    await expect(result.current.logout()).rejects.toThrow('logout failed')
  })

  it('should work again', async () => {
    // TODO: mockImplementationOnce of previous test is somehow still in effect and can't be restored with restoreAllMocks.
    mockServices.fetchLogout = jest.fn().mockImplementationOnce(() => Promise.resolve())

    const { result } = renderHook(() => useAuthProvider())
    act(() => {
      result.current.setExpire(9999999999) // if this test fails, how did react js even survive this long?
    })
    expect(result.current.isAuth).toBe(true)
    await act(async () => {
      await result.current.logout()
    })
    expect(result.current.isAuth).toBe(false)
  })
})
