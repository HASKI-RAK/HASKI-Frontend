import { AuthContext } from '@services'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Course from './Course'
import * as router from 'react-router'

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
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('Wirtschaftsinformatik'))
    })
  })

  it('renders course page with topics, clicking on second topic', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('Informatik'))
    })
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
})
