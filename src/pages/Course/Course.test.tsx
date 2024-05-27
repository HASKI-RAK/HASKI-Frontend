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
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    jest.runAllTimers()
    expect(navigate).toHaveBeenCalledWith('/login')
  })

  it('renders course page with topics and clicking on first topic navigates to topic/1', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics and clicking on second topic navigates to topic/2', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[1])
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  })

  /*it('renders course page with topics, getLearningPathElement throws error', async () => {
    // obsoolete
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getLearningPathElementStatus throws error', async () => {
    // obsolete
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getUser throws error', async () => {
    //obsolete
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  })*/

  test('functionality of hook', () => {
    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    console.log(result.current)

    expect(result.current).toStrictEqual({
      calculatedTopicProgress: [],
      isLoading: true,
      topics: []
    })
  })

  test('functionality of hook with getLearningPathElement failed', () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    console.log(result.current)

    expect(result.current).toStrictEqual({
      calculatedTopicProgress: [],
      isLoading: true,
      topics: []
    })
  })

  test('functionality of hook with getLearningPathElementStatus failed', () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElementStatus error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    console.log(result.current)

    expect(result.current).toStrictEqual({
      calculatedTopicProgress: [],
      isLoading: true,
      topics: []
    })
  })

  test('functionality of hook with getLearningPathTopic failed', () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    console.log(result.current)

    expect(result.current).toStrictEqual({
      calculatedTopicProgress: [],
      isLoading: true,
      topics: []
    })
  })

  test('functionality of hook with getUser failed', () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const { result } = renderHook(() => useCourse(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    console.log(result.current)

    expect(result.current).toStrictEqual({
      calculatedTopicProgress: [],
      isLoading: true,
      topics: []
    })
  })
})
