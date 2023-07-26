import { Home } from '@pages'
import { AuthContext } from '@services'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as router from 'react-router'
import React from 'react'
import { mockServices } from '../../../jest.setup'

const navigate = jest.fn()

jest.useFakeTimers()

describe('Test the Home page', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('navigate back to /login page', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    jest.runAllTimers()
    expect(navigate).toHaveBeenCalledWith('/login')
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
    const { getAllByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const course = getAllByText('components.Home.Button.Course')
      fireEvent.click(course[1])
      expect(navigate).toHaveBeenCalledWith('/course/2')
    })
  })

  test('fetching User throws error', async () => {

    mockServices.getUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

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
      expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
    })
  })

  test('fetching Course throws error', async () => {

    mockServices.getCourses.mockImplementationOnce(() => {
      throw new Error('Error')
    })

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
      expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
    })
  })

  test('fetching Course returns no courses', async () => {

    const mockgetCourse = jest.fn(() => {
      return Promise.resolve({
        courses: []
      })
    })

    mockServices.getCourses.mockImplementationOnce(mockgetCourse)

    const { getByText } = render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.Home.NoCourses')).toBeInTheDocument()
    })
  })
})
