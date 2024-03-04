import '@testing-library/jest-dom'
import { act, render, renderHook, waitFor} from '@testing-library/react'
import { mockReactFlow } from '@mocks'
import { createTheme } from '@common/theme'
import Router, { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'
import { useTopic, useTopicHookParams } from './Topic.hooks'
import Topic from './Topic'
import { LearningPathElementStatus } from '@core'

const { AuthContext } = jest.requireActual('@services')

const navigate = jest.fn()
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('Topic Page', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    mockReactFlow()
    jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate)
    jest.spyOn(Router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })
  })

  it('renders when Auth is true', async () => {
    await act(async () => {
      const topic = render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </MemoryRouter>
      )
      expect(topic).toBeTruthy()
    })
  })

  it('renders when Auth is false', () => {
    act(() => {
      const topic = render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </MemoryRouter>
      )

      expect(topic).toBeTruthy()
    })
  })

  test('Navigation called after timer finishes', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <Topic />
        </MemoryRouter>
      )
    })

    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(navigate).toBeCalledWith('/login')
  })

  test('getUser failed', async () => {
    const mockfetchUser = jest.fn(() => Promise.reject(new Error('fetchUser failed')))
    mockServices.fetchUser.mockImplementationOnce(mockfetchUser)

    act(() => {
      render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </MemoryRouter>
      )
    })
    await waitFor(() => {
      expect(mockfetchUser).toHaveBeenCalledTimes(1)
    })
  })

  test('getLearningPathElement failed', async () => {
    const mockfetchLearningPathElement = jest.fn(() => Promise.reject(new Error('fetchLearningPathElement failed')))
    mockServices.fetchLearningPathElement.mockImplementationOnce(mockfetchLearningPathElement)

    act(() => {
      render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(mockfetchLearningPathElement).toHaveBeenCalledTimes(1)
    })
  })

  test('getLearningPathElementStatus failed', async () => {
    const mockfetchLearningPathElementStatus = jest.fn(() =>
      Promise.reject(new Error('fetchLearningPathElementStatus failed'))
    )
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(mockfetchLearningPathElementStatus)

    act(() => {
      render(
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </MemoryRouter>
      )
    })
    await waitFor(() => {
      expect(mockfetchLearningPathElementStatus).toHaveBeenCalledTimes(1)
    })
  })

  test('General functionality of Topic hook', () => {
    const { result } = renderHook(() => useTopic())
    expect(result.current).toStrictEqual({
      url: '',
      title: '',
      isOpen: false,
      lmsId: -1,
      handleClose: expect.any(Function),
      handleOpen: expect.any(Function),
      handleSetTitle: expect.any(Function),
      handleSetUrl: expect.any(Function),
      handleSetLmsId: expect.any(Function),
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
          id: 2,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 2,
          learning_element: {
            id: 2,
            lms_id: 2,
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
              learning_element_id: 2,
              done: false,
              done_at: ''
            }
          }
        }
      ]
    }

    const mockLearningElementStatus: LearningPathElementStatus[] = [
      {
        cmid: 1,
        state: 0,
        timecompleted: 1
      },
      {
        cmid: 2,
        state: 1,
        timecompleted: 2
      }
    ]

    const nodesAndEdges = result.current.mapNodes(mockLearningPath, mockTheme, mockLearningElementStatus)
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
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          position: {
            x: -225,
            y: 0
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
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
            lmsId: 2,
            name: '',
            isDone: true,
            handleSetLmsId: expect.any(Function)
          },
          position: {
            x: -225,
            y: 250
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
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

      result.current.handleSetLmsId(1)
      expect(result.current.lmsId).toBe(-1)
    })
  })

  test('General functionality of Topic hook with less than 3 ÜB elements', () => {
    const { result } = renderHook(() => useTopic())
    expect(result.current).toStrictEqual({
      url: '',
      title: '',
      isOpen: false,
      handleClose: expect.any(Function),
      handleOpen: expect.any(Function),
      handleSetTitle: expect.any(Function),
      handleSetUrl: expect.any(Function),
      mapNodes: expect.any(Function),
      lmsId: -1,
      handleSetLmsId: expect.any(Function)
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
          id: 2,
          learning_element_id: 1,
          learning_path_id: 1,
          recommended: true,
          position: 2,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 3,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 3,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 4,
          learning_element_id: 3,
          learning_path_id: 1,
          recommended: true,
          position: 4,
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

    const mockLearningElementStatus: LearningPathElementStatus[] = [
      {
        cmid: 1,
        state: 0,
        timecompleted: 1
      },
      {
        cmid: 2,
        state: 1,
        timecompleted: 2
      }
    ]

    const nodesAndEdges = result.current.mapNodes(mockLearningPath, mockTheme, mockLearningElementStatus)
    expect(nodesAndEdges).toStrictEqual({
      nodes: [
        {
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '1',
          position: {
            x: 325,
            y: 0
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: ''
        },
        {
          data: {
            label: 'Übungen'
          },
          id: '2',
          position: {
            x: 0,
            y: 250
          },
          style: {
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            height: 200,
            width: 1150
          },
          type: 'GROUP'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '2-1',
          position: {
            x: 50,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '3-1',
          position: {
            x: 600,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '5',
          position: {
            x: 325,
            y: 770
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: ''
        }
      ],
      edges: [
        {
          id: 'Edge1',
          source: '1',
          target: '2'
        },
        {
          id: 'Edge2',
          source: '2',
          target: '5'
        },
        {
          id: 'Edge5',
          source: '5',
          target: undefined
        }
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

      result.current.handleSetLmsId(1)
      expect(result.current.lmsId).toBe(-1)
    })
  })

  test('General functionality of Topic hook with more than 3 ÜB elements', () => {
    const { result } = renderHook(() => useTopic())
    expect(result.current).toStrictEqual({
      url: '',
      title: '',
      isOpen: false,
      handleClose: expect.any(Function),
      handleOpen: expect.any(Function),
      handleSetTitle: expect.any(Function),
      handleSetUrl: expect.any(Function),
      mapNodes: expect.any(Function),
      lmsId: -1,
      handleSetLmsId: expect.any(Function)
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
          id: 2,
          learning_element_id: 1,
          learning_path_id: 1,
          recommended: true,
          position: 2,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 3,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 3,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 4,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 4,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 5,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 5,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 6,
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 6,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: '',
            classification: 'ÜB',
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
          id: 7,
          learning_element_id: 3,
          learning_path_id: 1,
          recommended: true,
          position: 7,
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

    const mockLearningElementStatus: LearningPathElementStatus[] = [
      {
        cmid: 1,
        state: 0,
        timecompleted: 1
      },
      {
        cmid: 2,
        state: 1,
        timecompleted: 2
      }
    ]

    const nodesAndEdges = result.current.mapNodes(mockLearningPath, mockTheme, mockLearningElementStatus)
    expect(nodesAndEdges).toStrictEqual({
      nodes: [
        {
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '1',
          position: {
            x: 875,
            y: 0
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: ''
        },
        {
          data: {
            label: 'Übungen'
          },
          id: '2',
          position: {
            x: 0,
            y: 250
          },
          style: {
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            height: 325,
            width: 2250
          },
          type: 'GROUP'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '2-1',
          position: {
            x: 50,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '3-1',
          position: {
            x: 600,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '4-1',
          position: {
            x: 1150,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '5-1',
          position: {
            x: 1700,
            y: 300
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '6-1',
          position: {
            x: 50,
            y: 425
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'ÜB'
        },
        {
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '8',
          position: {
            x: 875,
            y: 770
          },
          style: {
            background: '#1976d2',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: ''
        }
      ],
      edges: [
        {
          id: 'Edge1',
          source: '1',
          target: '2'
        },
        {
          id: 'Edge2',
          source: '2',
          target: '8'
        },
        {
          id: 'Edge8',
          source: '8',
          target: undefined
        }
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

      result.current.handleSetLmsId(1)
      expect(result.current.lmsId).toBe(-1)
    })
  })

  test('IFrameModal can be closed', async () => {
    const topicParams: useTopicHookParams = {
      defaultUrl: 'hello',
      defaultTitle: 'test',
      defaultIsOpen: true,
      defaultLmsId: 0
    }

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Topic useTopic={() => useTopic(topicParams)} />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      getByTestId('IFrameModal-Close-Button').click()
    })

    await waitFor(() => {
      expect(queryByTestId('IFrameModal-Close-Button')).not.toBeInTheDocument()
    })
  })

  test('IFrameModal fetchLearningPathElementSpecificStatus fetching error while closing', async () => {
    const mockfetchLearningPathElementSpecificStatus = jest.fn(() =>
      Promise.reject(new Error('fetchLearningPathElementSpecificStatus failed'))
    )
    mockServices.fetchLearningPathElementSpecificStatus.mockImplementationOnce(
      mockfetchLearningPathElementSpecificStatus
    )

    const topicParams: useTopicHookParams = {
      defaultUrl: 'hello',
      defaultTitle: 'test',
      defaultIsOpen: true,
      defaultLmsId: 0
    }

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Topic useTopic={() => useTopic(topicParams)} />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      getByTestId('IFrameModal-Close-Button').click()
    })

    await waitFor(() => {
      expect(queryByTestId('IFrameModal-Close-Button')).not.toBeInTheDocument()
    })
  })
})
