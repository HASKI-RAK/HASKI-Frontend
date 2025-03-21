import '@testing-library/jest-dom'
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { LocalNavBar } from '@components'
import { LearningPathElementStatus } from '@core'
import Topic from './Topic'
import { useTopic, useTopicHookParams } from './Topic.hooks'

const { AuthContext } = jest.requireActual('@services')

const navigate = jest.fn()
jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('Topic Page', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
    mockReactFlow()
  })

  const mocklearningPathDisabledClassifications: string[] = ['KÜ', 'EK']

  it('renders when Auth is true', () => {
    act(() => {
      const topic = render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <Topic />
            </AuthContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )

      expect(topic).toBeTruthy()
    })
  })

  it('renders when Auth is false', () => {
    act(() => {
      const topic = render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
            <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
              <Topic />
            </AuthContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
      expect(topic).toBeTruthy()
    })
  })

  test('getUser failed', async () => {
    const mockfetchUser = jest.fn(() => Promise.reject(new Error('fetchUser failed')))
    mockServices.fetchUser.mockImplementationOnce(mockfetchUser)

    act(() => {
      render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <Topic />
            </AuthContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })
    await waitFor(() => {
      expect(mockfetchUser).toHaveBeenCalledTimes(1)
    })
  })

  test('getLearningPathElementStatus failed', async () => {
    const mockfetchLearningPathElementStatus = jest.fn(() =>
      Promise.reject(new Error('fetchLearningPathElementStatus failed'))
    )
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(mockfetchLearningPathElementStatus)

    await act(async () => {
      render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <Topic />
            </AuthContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })
    await waitFor(() => {
      expect(mockfetchLearningPathElementStatus).toHaveBeenCalledTimes(1)
    })
  })

  test('getLearningPathElement failed', async () => {
    const mockfetchLearningPathElement = jest.fn(() => Promise.reject(new Error('fetchLearningPathElement failed')))
    mockServices.fetchLearningPathElement.mockImplementationOnce(mockfetchLearningPathElement)

    await act(async () => {
      render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <Topic />
            </AuthContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })
    await waitFor(() => {
      expect(mockfetchLearningPathElement).toHaveBeenCalledTimes(1)
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
      mapNodes: expect.any(Function)
    })

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

    const nodesAndEdges = result.current.mapNodes(
      mockLearningPath,
      mockLearningElementStatus,
      mocklearningPathDisabledClassifications
    )
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            isDisabled: false,
            name: '',
            isDone: false
          },
          position: {
            x: -250,
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isDisabled: false,
            isRecommended: true,
            lmsId: 2,
            name: '',
            isDone: true
          },
          position: {
            x: -250,
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
      lmsId: -1,
      mapNodes: expect.any(Function)
    })

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

    const nodesAndEdges = result.current.mapNodes(
      mockLearningPath,
      mockLearningElementStatus,
      mocklearningPathDisabledClassifications
    )
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
            handleSetLmsId: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDisabled: false,
            isDone: false
          },
          id: '1',
          position: {
            x: -250,
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
            activityType: '',
            classification: 'ÜB',
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false,
            handleSetLmsId: expect.any(Function),
            handleClose: expect.any(Function)
          },
          id: '2',
          position: {
            x: -250,
            y: 250
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            isDisabled: false,
            name: '',
            isDone: false
          },
          id: '3',
          position: {
            x: -250,
            y: 500
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
            isRecommended: true,
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            lmsId: 1,
            isDisabled: false,
            name: '',
            isDone: false
          },
          id: '4',
          position: {
            x: -250,
            y: 750
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
          target: '3'
        },
        {
          id: 'Edge3',
          source: '3',
          target: '4'
        },
        {
          id: 'Edge4',
          source: '4',
          target: undefined
        }
      ]
    })

    act(() => {
      result.current.handleOpen()
      expect(result.current.isOpen).toBe(false)

      result.current.handleClose()
      expect(result.current.isOpen).toBe(false)
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
      mapNodes: expect.any(Function),
      lmsId: -1
    })

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

    const nodesAndEdges = result.current.mapNodes(
      mockLearningPath,
      mockLearningElementStatus,
      mocklearningPathDisabledClassifications
    )
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
            isDisabled: false,
            handleSetLmsId: expect.any(Function)
          },
          id: '1',
          position: {
            x: -250,
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
            activityType: '',
            classification: 'ÜB',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '2',
          position: {
            x: -250,
            y: 250
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDisabled: false,
            isDone: false
          },
          id: '3',
          position: {
            x: -250,
            y: 500
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDisabled: false,
            isDone: false
          },
          id: '4',
          position: {
            x: -250,
            y: 750
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDisabled: false,
            isDone: false
          },
          id: '5',
          position: {
            x: -250,
            y: 1000
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            isDisabled: false,
            name: '',
            isDone: false
          },
          id: '6',
          position: {
            x: -250,
            y: 1250
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDisabled: false,
            isDone: false
          },
          id: '7',
          position: {
            x: -250,
            y: 1500
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
        { id: 'Edge1', source: '1', target: '2' },
        { id: 'Edge2', source: '2', target: '3' },
        { id: 'Edge3', source: '3', target: '4' },
        { id: 'Edge4', source: '4', target: '5' },
        { id: 'Edge5', source: '5', target: '6' },
        { id: 'Edge6', source: '6', target: '7' },
        { id: 'Edge7', source: '7', target: undefined }
      ]
    })

    act(() => {
      result.current.handleOpen()
      expect(result.current.isOpen).toBe(false)

      result.current.handleClose()
      expect(result.current.isOpen).toBe(false)
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
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic useTopic={() => useTopic(topicParams)} />
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
    screen.debug()

    await waitFor(() => {
      fireEvent.click(getByTestId('IFrameModal-Close-Button'))
    })

    await waitFor(() => {
      expect(queryByTestId('IFrameModal-Close-Button')).not.toBeInTheDocument()
    })
  }, 20000)

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
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic useTopic={() => useTopic(topicParams)} />
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    await waitFor(() => {
      getByTestId('IFrameModal-Close-Button').click()
    })

    await waitFor(() => {
      expect(queryByTestId('IFrameModal-Close-Button')).not.toBeInTheDocument()
    })
  })

  test('General functionality of Topic hook with one le followed by a group of more than 3 le of the same classification', () => {
    const { result } = renderHook(() => useTopic())
    expect(result.current).toStrictEqual({
      url: '',
      title: '',
      isOpen: false,
      handleClose: expect.any(Function),
      handleOpen: expect.any(Function),
      mapNodes: expect.any(Function),
      lmsId: -1
    })

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
            classification: 'EK',
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
          id: 3,
          learning_element_id: 1,
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
          learning_element_id: 2,
          learning_path_id: 1,
          recommended: true,
          position: 7,
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
          id: 8,
          learning_element_id: 3,
          learning_path_id: 1,
          recommended: true,
          position: 8,
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

    const nodesAndEdges = result.current.mapNodes(
      mockLearningPath,
      mockLearningElementStatus,
      mocklearningPathDisabledClassifications,
      true
    )
    expect(nodesAndEdges).toStrictEqual({
      nodes: [
        {
          data: {
            activityType: '',
            classification: 'EK',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: true,
            handleSetLmsId: expect.any(Function)
          },
          id: '1',
          position: {
            x: -250,
            y: 0
          },
          style: {
            background: '#01579b',
            border: '1px solid #9e9e9e',
            borderRadius: 8,
            cursor: 'pointer',
            padding: 10,
            width: 500
          },
          type: 'EK'
        },
        {
          data: {
            activityType: '',
            classification: '',
            handleClose: expect.any(Function),
            handleOpen: expect.any(Function),
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '2',
          position: {
            x: -250,
            y: 250
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
            classification: 'ÜB',
            label: 'components.NodeTypes.üb'
          },
          id: '3',
          position: {
            x: -1125,
            y: 500
          },
          style: {
            border: '2px solid #9e9e9e',
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '3-1',
          position: {
            x: -1075,
            y: 550
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '4-1',
          position: {
            x: -525,
            y: 550
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '5-1',
          position: {
            x: 25,
            y: 550
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '6-1',
          position: {
            x: 575,
            y: 550
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isRecommended: true,
            lmsId: 1,
            name: '',
            isDone: false,
            isDisabled: false
          },
          id: '7-1',
          position: {
            x: -1075,
            y: 675
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
            handleSetLmsId: expect.any(Function),
            handleSetTitle: expect.any(Function),
            handleSetUrl: expect.any(Function),
            isDone: false,
            isDisabled: false,
            isRecommended: true,
            lmsId: 1,
            name: ''
          },
          id: '8-1',
          position: {
            x: -525,
            y: 675
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
        }
      ],
      edges: [
        { id: 'Edge1', source: '1', target: '2' },
        { id: 'Edge2', source: '2', target: '3' },
        { id: 'Edge3', source: '3', target: undefined }
      ]
    })

    act(() => {
      result.current.handleOpen()
      expect(result.current.isOpen).toBe(false)

      result.current.handleClose()
      expect(result.current.isOpen).toBe(false)
    })
  })

  test('FitView is called on topic change', async () => {
    const topicParams: useTopicHookParams = {
      defaultUrl: 'hello',
      defaultTitle: 'test',
      defaultIsOpen: true,
      defaultLmsId: 0
    }

    const initialEntries = ['/course', '/2', '/topic/20']

    const { getByTestId, queryByTestId, getByText } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic useTopic={() => useTopic(topicParams)} />
            <LocalNavBar />
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
    screen.debug()

    await waitFor(() => {
      fireEvent.click(getByTestId('IFrameModal-Close-Button'))
    })

    await waitFor(() => {
      expect(queryByTestId('IFrameModal-Close-Button')).not.toBeInTheDocument()
      act(() => {
        fireEvent.click(getByText('Wirtschaftsinformatik'))
        expect(navigate).toHaveBeenCalledWith('/course/2/topic/1')
        act(() => {
          // Replace runAllTimers with a more controlled approach
          jest.advanceTimersByTime(200) // Adjust timing as needed
        })
      })
    })
  })
})
