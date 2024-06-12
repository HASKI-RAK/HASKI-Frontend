import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import { useLearningPathTopic } from './LearningPathTopic.hooks'

describe('LearningPathTopicProgress tests', () => {
  const navigate = jest.fn()
  jest.useFakeTimers()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('functionality of hook without input', () => {
    const { result } = renderHook(() => useLearningPathTopic(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    expect(result.current).toEqual({ loading: true, topics: [] })
  })

  test('functionality of hook with getUser failed', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const { result } = renderHook(() => useLearningPathTopic(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.loading).toBeTruthy()
      expect(result.current.topics).toStrictEqual([])
    })
  })

  test('functionality of hook with getLearningPathTopic failed', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    const { result } = renderHook(() => useLearningPathTopic(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topics).toStrictEqual([])
      expect(result.current.loading).toBeTruthy()
    })
  })
})
