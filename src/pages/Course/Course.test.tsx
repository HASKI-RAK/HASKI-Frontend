import { fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Course from './Course'
import { useCourse } from './Course.hooks'

const navigate = jest.fn()
jest.useFakeTimers()

describe('Course tests', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('user is redirected to /login if not Authenticated', () => {
    render(
      <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    jest.runAllTimers()
    expect(navigate).toHaveBeenCalledWith('/login')
  })

  it('renders course page with topics and clicking on first topic navigates to topic/1', async () => {
    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics and clicking on second topic navigates to topic/2', async () => {
    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[1])
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  })

  test('functionality of hook', async () => {
    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.calculatedTopicProgress).toStrictEqual([
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

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.calculatedTopicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathTopic failed', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.calculatedTopicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathElementStatus failed', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElementStatus error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })
    await waitFor(() => {
      expect(result.current.calculatedTopicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })

  test('functionality of hook with getLearningPathElement failed', async () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.calculatedTopicProgress).toStrictEqual([])
      expect(result.current.isLoading).toBeTruthy()
      expect(result.current.topics.length).toStrictEqual(0)
    })
  })
})
