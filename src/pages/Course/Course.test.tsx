import { fireEvent, render, waitFor } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Course from './Course'

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
})
