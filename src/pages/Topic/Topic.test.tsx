import { act, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
// import 'reactflow/dist/base.css'
import { Router } from 'react-router-dom'
import Topic from './Topic'
const { AuthContext } = jest.requireActual('@services')


describe('Topic tests', () => {
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
    // const mockFn = jest.fn().mockImplementation(() => {
    //   return Promise.reject(new Error("getUser failed"));
    // });
    // jest.mock('@services', () => ({
    //   ...jest.requireActual('@services'),
    //   getUser: mockFn
    // }))
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )
    })
    // expect(mockFn).toHaveBeenCalled()
  })

})
