import { act, render, renderHook, fireEvent, screen } from '@testing-library/react'
import { LearningPathLearningElementNode, nodeTypes } from '@components'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
// import 'reactflow/dist/base.css'
import { mockReactFlow } from '__mocks__/ResizeObserver'
import { Router } from 'react-router-dom'
import Topic from './Topic'
import { AuthContext } from '@services'
import * as services from '@services'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Topic tests', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    mockReactFlow()
    jest.spyOn(services, 'getUser').mockImplementation(() => {
      return Promise.resolve({
        id: 1,
        lmsUserId: 1,
        name: 'Theodor Tester',
        role: 'Tester',
        roleId: 1,
        settings: {
          id: 1,
          userId: 1,
          pswd: 'test',
          theme: 'test'
        },
        university: 'test'
      })
    })
  })
  // If this test is added, the behavior of the tests below change.
  // Suddenly line 49 in Topic.tsx is uncovered.!
  test('getUser not fail', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )
    })
  })

  test('getUser fail option 1', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    // This does not work!!!
    ;(services.getUser as jest.MockedFunction<typeof services.getUser>).mockRestore()
    jest.spyOn(services, 'getUser').mockImplementation(() => {
      return Promise.reject(new Error('getUser failed'))
    })
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )
    })
  })

  test('getUser fail option 2', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    jest.spyOn(services, 'getUser').mockImplementation(() => {
      return Promise.reject(new Error('getUser failed'))
    })

    jest.spyOn(services, 'getUser').withImplementation(
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
  })
})
