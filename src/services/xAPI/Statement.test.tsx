import { useStatement, xAPIVerb, xAPIComponent } from './Statement.hooks'
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as statement from './getStatement'
import { mockServices } from 'jest.setup'
import '@testing-library/jest-dom'
import xAPI from './xAPI.setup'
import log from 'loglevel'

describe('Statement tests', () => {
  const sendStatement = jest.fn()
  const getStatement = jest.fn()

  beforeEach(() => {
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)
    jest.spyOn(statement, 'getStatement').mockImplementation(getStatement)
  })

  test('Functionality of empty Statement hook', async () => {
    const { result } = renderHook(() => useStatement(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    expect(result.current).toMatchObject({
      sendStatement: expect.any(Function)
    })

    result.current.sendStatement(xAPIVerb.clicked).catch((error) => log.error(error))

    await waitFor(() => {
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
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    expect(result.current).toMatchObject({
      sendStatement: expect.any(Function)
    })

    result.current.sendStatement(xAPIVerb.clicked)

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
      expect(getStatement).toHaveBeenCalledWith(
        '-1',
        xAPIVerb[xAPIVerb.clicked],
        '/',
        'null',
        'Null',
        expect.any(Function)
      )
    })
  })

  /*test('sendStatement fails', async () => {

    jest.spyOn(xAPI, 'sendStatement').mockImplementation(() => {
      throw new Error('Error has not been caught')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { result } = renderHook(() => useStatement(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    expect(result.current).toMatchObject({
      sendStatement: expect.any(Function)
    })

    result.current.sendStatement(xAPIVerb.clicked)

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })*/
})
