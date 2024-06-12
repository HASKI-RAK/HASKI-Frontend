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

    expect(result.current).toEqual({ isLoading: true, topicProgress: [[]], topics: [] })
  })

  test('functionality of hook without input and isAuth false', () => {
    renderHook(() => useLearningPathTopicProgress(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    jest.runAllTimers()
    expect(navigate).toHaveBeenCalledWith('/login')
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
      expect(result.current.topicProgress).toStrictEqual([[]])
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
      expect(result.current.topicProgress).toStrictEqual([[]])
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
      expect(result.current.topicProgress).toStrictEqual([[]])
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
      expect(result.current.topicProgress).toStrictEqual([[]])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })
})
