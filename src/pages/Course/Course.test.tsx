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

  it('renders course page with topics and clicking on first topic navigates to topic/1', async () => {
    const { getAllByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByTestId('Topic-Navigate-Button')[0])
      expect(navigate).toHaveBeenCalledWith('topic/1')
    })
  }, 20000)

  it('renders course page with topics and clicking on second topic navigates to topic/2', async () => {
    const { getAllByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByTestId('Topic-Navigate-Button')[1])
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  })
})
