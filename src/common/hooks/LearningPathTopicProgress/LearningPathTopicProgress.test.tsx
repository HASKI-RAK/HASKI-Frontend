import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import { useLearningPathTopicProgress } from './LearningPathTopicProgress.hooks'

describe('LearningPathTopicProgress tests', () => {
  const navigate = jest.fn()
  jest.useFakeTimers()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('functionality of hook without input', () => {
    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    expect(result.current).toEqual({ isLoading: true, topicProgress: [], topics: [] })
  })

  test('functionality of hook with input', async () => {
    const { result } = renderHook(() => useLearningPathTopicProgress({ courseId: '1' }), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([
        [2, 4],
        [2, 4]
      ])
      expect(result.current.isLoading).toBeFalsy()
      expect(result.current.topics.length).toStrictEqual(2)
    })
  })

  test('functionality of hook with getUser failed', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathTopic failed', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathElementStatus failed', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElementStatus error')
    })

    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })
    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathElement failed', async () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getDefaultLearningPath failed', async () => {
    mockServices.fetchDefaultLearningPath.mockImplementationOnce(() => {
      throw new Error('getDefaultLearningPath error')
    })

    const { result } = renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('getTopicProgress ignores disabled classifications in default learning path', async () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        course_id: 2,
        based_on: 'default',
        calculated_on: 'string',
        path: [
          {
            id: 1,
            learning_element_id: 1,
            learning_path_id: 1,
            recommended: false,
            position: 1,
            learning_element: {
              id: 1,
              lms_id: 1,
              activity_type: 'test',
              classification: 'KÜ',
              name: 'test',
              university: 'test',
              created_at: 'test',
              created_by: 'test',
              last_updated: 'test',
              student_learning_element: {
                id: 1,
                student_id: 1,
                learning_element_id: 1,
                done: false,
                done_at: 'test'
              }
            }
          },
          {
            id: 2,
            learning_element_id: 2,
            learning_path_id: 2,
            recommended: false,
            position: 2,
            learning_element: {
              id: 2,
              lms_id: 2,
              activity_type: 'test',
              classification: 'ÜB',
              name: 'test',
              university: 'test',
              created_at: 'test',
              created_by: 'test',
              last_updated: 'test',
              student_learning_element: {
                id: 2,
                student_id: 1,
                learning_element_id: 2,
                done: false,
                done_at: 'test'
              }
            }
          },
          {
            id: 3,
            learning_element_id: 3,
            learning_path_id: 3,
            recommended: false,
            position: 3,
            learning_element: {
              id: 3,
              lms_id: 3,
              activity_type: 'test',
              classification: 'ÜB',
              name: 'test',
              university: 'test',
              created_at: 'test',
              created_by: 'test',
              last_updated: 'test',
              student_learning_element: {
                id: 3,
                student_id: 1,
                learning_element_id: 3,
                done: false,
                done_at: 'test'
              }
            }
          },
          {
            id: 4,
            learning_element_id: 4,
            learning_path_id: 4,
            recommended: false,
            position: 4,
            learning_element: {
              id: 4,
              lms_id: 4,
              activity_type: 'test',
              classification: 'KÜ',
              name: 'test',
              university: 'test',
              created_at: 'test',
              created_by: 'test',
              last_updated: 'test',
              student_learning_element: {
                id: 4,
                student_id: 1,
                learning_element_id: 4,
                done: false,
                done_at: 'test'
              }
            }
          }
        ]
      })
    )

    const { result } = renderHook(() => useLearningPathTopicProgress({ courseId: '1' }), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topicProgress).toStrictEqual([
        [2, 2],
        [2, 4]
      ])
      expect(result.current.isLoading).toBeFalsy()
      expect(result.current.topics.length).toStrictEqual(2)
    })
  })
})
