import { act, render, renderHook } from '@testing-library/react'
import { mockReactFlow } from '__mocks__/ResizeObserver'
import { createMemoryHistory } from 'history'
import { createTheme } from '@mui/material'
import { Router } from 'react-router-dom'
import { useTopic } from './Topic.hooks'
import { AuthContext } from '@services'
import * as router from 'react-router'
import * as services from '@services'
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

    jest.spyOn(services, 'getLearningPath').mockImplementation(() => {
      return Promise.resolve({
        id: 1,
        courseId: 1,
        basedOn: 'test',
        calculatedOn: 'test',
        path: [
          {
            id: 1,
            learningElementId: 1,
            learningPathId: 1,
            recommended: false,
            position: 1,
            learningElement: {
              id: 1,
              lmsId: 1,
              activityType: 'test',
              classification: 'KÜ',
              name: 'test',
              university: 'test',
              createdAt: 'test',
              createdBy: 'test',
              lastUpdated: 'test',
              studentLearningElement: {
                id: 1,
                studentId: 1,
                learningElementId: 1,
                done: false,
                doneAt: 'test'
              }
            }
          },
          {
            id: 2,
            learningElementId: 2,
            learningPathId: 2,
            recommended: false,
            position: 2,
            learningElement: {
              id: 2,
              lmsId: 2,
              activityType: 'test',
              classification: 'ÜB',
              name: 'test',
              university: 'test',
              createdAt: 'test',
              createdBy: 'test',
              lastUpdated: 'test',
              studentLearningElement: {
                id: 2,
                studentId: 1,
                learningElementId: 2,
                done: false,
                doneAt: 'test'
              }
            }
          },
          {
            id: 3,
            learningElementId: 3,
            learningPathId: 3,
            recommended: false,
            position: 3,
            learningElement: {
              id: 3,
              lmsId: 3,
              activityType: 'test',
              classification: 'ÜB',
              name: 'test',
              university: 'test',
              createdAt: 'test',
              createdBy: 'test',
              lastUpdated: 'test',
              studentLearningElement: {
                id: 3,
                studentId: 1,
                learningElementId: 3,
                done: false,
                doneAt: 'test'
              }
            }
          },
          {
            id: 4,
            learningElementId: 4,
            learningPathId: 4,
            recommended: false,
            position: 4,
            learningElement: {
              id: 4,
              lmsId: 4,
              activityType: 'test',
              classification: 'KÜ',
              name: 'test',
              university: 'test',
              createdAt: 'test',
              createdBy: 'test',
              lastUpdated: 'test',
              studentLearningElement: {
                id: 4,
                studentId: 1,
                learningElementId: 4,
                done: false,
                doneAt: 'test'
              }
            }
          }
        ]
      })
    })
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
      courseId: 1,
      basedOn: '',
      calculatedOn: '',
      path: [
        {
          id: 1,
          learningElementId: 1,
          learningPathId: 1,
          recommended: true,
          position: 1,
          learningElement: {
            id: 1,
            lmsId: 1,
            activityType: '',
            classification: '',
            name: '',
            university: '',
            createdBy: '',
            createdAt: '',
            lastUpdated: '',
            studentLearningElement: {
              id: 1,
              studentId: 1,
              learningElementId: 1,
              done: false,
              doneAt: ''
            }
          }
        },
        {
          id: 1,
          learningElementId: 1,
          learningPathId: 1,
          recommended: true,
          position: 2,
          learningElement: {
            id: 1,
            lmsId: 1,
            activityType: '',
            classification: '',
            name: '',
            university: '',
            createdBy: '',
            createdAt: '',
            lastUpdated: '',
            studentLearningElement: {
              id: 1,
              studentId: 1,
              learningElementId: 1,
              done: false,
              doneAt: ''
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
