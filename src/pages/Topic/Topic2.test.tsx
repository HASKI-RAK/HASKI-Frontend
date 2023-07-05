import { mockReactFlow } from '__mocks__/ResizeObserver'
import { act, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AuthContext } from '@services'
import * as services from '@services'
import '@testing-library/jest-dom'
import Topic from './Topic'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Topic tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  test('getUser fails', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    jest.spyOn(services, 'getUser').mockImplementation(() => {
      return Promise.reject(new Error('getUser failed'))
    })

    const getUser = jest.spyOn(services, 'getUser')

    getUser.withImplementation(
      () => {
        throw new Error('getUser failed')
      },
      () =>
        act(() => {
          render(
            <Router location={history.location} navigator={history}>
              <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
                <Topic />
              </AuthContext.Provider>
            </Router>
          )
        })
    )
    expect(getUser).toThrow('getUser failed')
  })
})
