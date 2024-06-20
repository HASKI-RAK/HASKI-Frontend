import { fireEvent, render, waitFor, prettyDOM, act, screen } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Course from './Course'

const navigate = jest.fn()
jest.useFakeTimers()

describe('Course', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('user is redirected to /login if not Authenticated', () => {
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

  it('renders course page with topics, clicking on first topic', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    console.log(prettyDOM())
    await waitFor(() => {
      fireEvent.click(getByTestId('CourseCardTopicWirtschaftsinformatik'))
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, clicking on second topic', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    console.log(prettyDOM())
    await waitFor(() => {
      fireEvent.click(getByTestId('CourseCardTopicInformatik'))
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  })

  it('renders course page, clicking button navigates to topic page', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    console.log(prettyDOM())
    await waitFor(() => {
      fireEvent.click(getByTestId('CourseCardTopicInformatik'))
      expect(navigate).toHaveBeenCalledWith('topic/2')
    })
  })

  it('renders course page with topics, getLearningPathElement throws error', async () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('CourseCardTopicWirtschaftsinformatik'))
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getLearningPathElementStatus throws error', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('CourseCardTopicWirtschaftsinformatik'))
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getUser throws error', async () => {
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
  })

  test('settingsbutton opens menu', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByTestId('TopicSettingsButton')[0])
    })

    expect(getByTestId('TopicSettingsMenu')).toBeInTheDocument
  })

  test('modal can be opened and closed', async () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => act(() => {
      fireEvent.click(getAllByTestId('TopicSettingsButton')[0])
      expect(getByTestId('AlgorithmSettingsItem')).toBeInTheDocument
        
    }))
    fireEvent.click(getByTestId('AlgorithmSettingsItem'))
    expect(getByTestId('TopicSettingsMenu')).not.toBeInTheDocument
    screen.debug(undefined, 300000)
    expect(getByTestId('algorithm-modal')).toBeInTheDocument
    fireEvent.click(getByTestId('algorithm-modal-close-button'))
    expect(queryByTestId('algorithm-modal')).toBeNull()
  })
})
