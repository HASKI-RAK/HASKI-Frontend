import { act, render, renderHook } from '@testing-library/react'
import { mockReactFlow } from '__mocks__/ResizeObserver'
import { createMemoryHistory } from 'history'
import { createTheme } from '@mui/material'
import { Router } from 'react-router-dom'
import { mockServices } from 'jest.setup'
import { useTopic } from './Topic.hooks'
import { AuthContext } from '@services'
import * as router from 'react-router'
import '@testing-library/jest-dom'
import Topic from './Topic'

const navigate = jest.fn()
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Topic tests', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    mockReactFlow()
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('renders when Auth is true', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    await act(async () => {
      const topic = render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )

      expect(topic).toBeTruthy()
    })
  })

  it('renders when Auth is false', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    await act(async () => {
      const topic = render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )

      expect(topic).toBeTruthy()
    })
  })

  test('Navigation called after timer finishes', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Topic />
        </Router>
      )
    })

    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(navigate).toBeCalledWith('/login')
  })

  test('getUser fails', () => {
    // await act(async () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    mockServices.getUser.mockImplementation(() => {
      return Promise.reject('getUser failed')
    })

    render(
      <Router location={history.location} navigator={history}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Topic />
        </AuthContext.Provider>
      </Router>
    )
    // expect(getUser).toThrow('getUser failed')
    // })
  })

  test('General functionality of Topic hook', () => {
    const { result } = renderHook(() => useTopic())
    expect(result.current).toStrictEqual({
      url: '',
      title: '',
      isOpen: false,
      handleClose: expect.any(Function),
      handleOpen: expect.any(Function),
      handleSetTitle: expect.any(Function),
      handleSetUrl: expect.any(Function),
      mapNodes: expect.any(Function)
    })

    const mockTheme = createTheme()

    const mockLearningPath = {
      id: 1,
      course_id: 1,
      based_on: '',
      calculated_on: '',
      path: [
        {
          id: 1,
          learning_element_id: 1,
          learning_path_id: 1,
          recommended: true,
          position: 1,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: '',
            name: '',
            university: '',
            created_by: '',
            created_at: '',
            last_updated: '',
            student_learning_element: {
              id: 1,
              student_id: 1,
              learning_element_id: 1,
              done: false,
              done_at: ''
            }
          }
        },
        {
          id: 1,
          learning_element_id: 1,
          learning_path_id: 1,
          recommended: true,
          position: 2,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: '',
            name: '',
            university: '',
            created_by: '',
            created_at: '',
            last_updated: '',
            student_learning_element: {
              id: 1,
              student_id: 1,
              learning_element_id: 1,
              done: false,
              done_at: ''
            }
          }
        }
      ]
    }

    const nodesAndEdges = result.current.mapNodes(mockLearningPath, mockTheme)
    expect(nodesAndEdges).toStrictEqual({
      nodes: [
        {
          id: '1',
          type: '',
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: ''
          },
          position: {
            x: -100,
            y: 0
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10
          }
        },
        {
          id: '2',
          type: '',
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: ''
          },
          position: {
            x: -100,
            y: 250
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10
          }
        }
      ],
      edges: [
        { id: 'Edge1', source: '1', target: '2' },
        { id: 'Edge2', source: '2', target: undefined }
      ]
    })

    act(() => {
      result.current.handleOpen()
      expect(result.current.isOpen).toBe(false)

      result.current.handleClose()
      expect(result.current.isOpen).toBe(false)

      result.current.handleSetTitle('testTitle')
      expect(result.current.title).toBe('')

      result.current.handleSetUrl('testUrl')
      expect(result.current.url).toBe('')
    })
  })
})
