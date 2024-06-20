import '@testing-library/jest-dom'
import { fireEvent, screen, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '@pages'
import { AuthContext } from '@services'
import { act } from 'react-dom/test-utils'
import exp from 'constants'

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
      expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
    })
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
      const course = getAllByText('pages.course.courseButton')
      fireEvent.click(course[1])
      expect(navigate).toHaveBeenCalledWith('/course/2')
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
      expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
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

  test('settings button opens menu', async () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      fireEvent.click(getAllByTestId('settings-button')[0])
      expect(getByTestId('settings-menu')).toBeInTheDocument()

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

    await waitFor(() => act(() => {
      fireEvent.click(getAllByTestId('settings-button')[0])
    }))
    expect(getByTestId('settings-menu')).toBeInTheDocument()
    fireEvent.click(getByTestId('menu-item-algorithm'))
    expect(queryByTestId('settings-menu')).not.toBeInDocument
  })

  test('modal can be opened and closed', async () => {
      const { getAllByTestId, getByTestId, queryByTestId } = render(
        <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    
    await waitFor(() => act(() => {
      fireEvent.click(getAllByTestId('settings-button')[0])
      expect(getByTestId('settings-menu')).toBeInTheDocument()
    }))
    expect(getByTestId('menu-item-algorithm')).toBeInTheDocument()
    fireEvent.click(getByTestId('menu-item-algorithm'))
    expect(getByTestId('algorithm-modal')).toBeInTheDocument
    fireEvent.click(getByTestId('algorithm-modal-close-button'))
    expect(queryByTestId('algorithm-modal')).toBeNull()
  })
})
