import '@testing-library/jest-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import log from 'loglevel'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import * as statement from './getStatement'
import { useStatement, xAPIComponent, xAPIVerb } from './Statement.hooks'

// import xAPI from './xAPI.setup'

describe('Statement tests', () => {
  const sendStatement = jest.fn()
  const getStatement = jest.fn()

  beforeEach(() => {
    jest.spyOn(statement, 'getStatement').mockImplementation(getStatement)
  })

  test('Functionality of empty Statement hook', async () => {
    const { result } = renderHook(() => useStatement(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    expect(result.current).toMatchObject({
      sendStatement: expect.any(Function)
    })

    act(() => {
      result.current.sendStatement(xAPIVerb.clicked, 'filePath').catch((error) => log.error(error))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
        expect(getStatement).toHaveBeenCalledWith(
          '1',
          xAPIVerb[xAPIVerb.clicked],
          '/',
          'null',
          'Null',
          expect.any(Function)
        )
      })
    })
  })

  test('getEnglishName', async () => {
    const { result } = renderHook(
      () =>
        useStatement({
          defaultComponentID: '0',
          defaultComponent: xAPIComponent.Button
        }),
      {
        wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
      }
    )

    expect(result.current).toMatchObject({
      getEnglishName: expect.any(Function),
      sendStatement: expect.any(Function)
    })

    expect(result.current.getEnglishName('test')).toStrictEqual('')
  })

  test('lmsUserID fetch fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    const { result } = renderHook(() => useStatement(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    expect(result.current).toMatchObject({
      sendStatement: expect.any(Function)
    })

    act(() => {
      result.current.sendStatement(xAPIVerb.clicked, 'filePath')
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
        expect(getStatement).toHaveBeenCalledWith(
          '-1',
          xAPIVerb[xAPIVerb.clicked],
          '/',
          'null',
          'Null',
          expect.any(Function),
          'filePath'
        )
      })
    })
  })
})
