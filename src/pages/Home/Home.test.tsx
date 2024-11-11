import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '@pages'
import { AuthContext, ThemeContextProvider } from '@services'

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
      <ThemeContextProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('pages.home.noCourses')
    })
  })

  test('render page', () => {
    const result = render(
      <ThemeContextProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    expect(result).toBeTruthy()
  })

  test('click on course navigates to course page', async () => {
    const { getAllByText } = render(
      <ThemeContextProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      const course = getAllByText('pages.course.courseButton')
      fireEvent.click(course[1])
      expect(navigate).toHaveBeenCalledWith('/course/2')
    })
  })

  test('fetching User throws error', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() => new Error('Error'))

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { container } = render(
      <ThemeContextProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('pages.home.noCourses')
    })
  })

  test('fetching Course returns no courses', async () => {
    mockServices.fetchCourses = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        courses: []
      })
    )

    const { getByText } = render(
      <ThemeContextProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      expect(getByText('pages.home.noCourses')).toBeInTheDocument()
    })
  })
})
