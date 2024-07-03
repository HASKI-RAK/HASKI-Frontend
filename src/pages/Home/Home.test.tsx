import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import exp from 'constants'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '@pages'
import { AuthContext } from '@services'

const navigate = jest.fn()

jest.useFakeTimers()

describe('Test the Home page', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })


  test('fetching Course throws error', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      return
    })

    const { container } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('pages.home.noCourses')
    })
  })

  test('render page', () => {
    const result = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(result).toBeTruthy()
  })

  test('click on course navigates to course page', async () => {
    await waitFor(() => {
      const { getAllByText } = render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      )

      act(() => {
        const course = getAllByText('pages.course.courseButton')
        fireEvent.click(course[1])
        expect(navigate).toHaveBeenCalledWith('/course/2')
      })
    })
  })

  test('fetching User throws error', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => new Error('Error'))

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { container } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('pages.home.noCourses')
    })
  })

  test('fetching Course returns no courses', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() =>
      Promise.resolve({
        courses: []
      })
    )

    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('pages.home.noCourses')).toBeInTheDocument()
    })
  })

  /*
    * currently commented out because UI element is not used/commented out at the moment
  test('settings button opens menu', async () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        fireEvent.click(getAllByTestId('settings-button')[0])
        expect(getAllByTestId('settings-menu')[0]).toBeInTheDocument()
      })
    })
  })

  test('settings button closes menu', async () => {
    const { getAllByTestId, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() =>
      act(() => {
        fireEvent.click(getAllByTestId('settings-button')[0])
      })
    )
    expect(getAllByTestId('settings-menu')[0]).toBeInTheDocument()
    fireEvent.click(getByTestId('menu-item-algorithm'))
    await waitFor(() => {
      expect(queryByTestId('settings-menu')).toBeNull()
    })
  })
  */
})
