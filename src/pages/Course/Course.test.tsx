import { fireEvent, render, waitFor } from '@testing-library/react'
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

  it('renders course page with topics, clicking on second topic', async () => {
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

  it('renders course page, clicking button navigates to topic page', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('Course-Card-Topic-Informatik'))
      expect(navigate).toHaveBeenCalledWith('topic/2')
    })
  })

  it('renders course page with topics, getLearningPathElement throws error', async () => {
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
})
