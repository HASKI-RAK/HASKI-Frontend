import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '@pages'
import { AuthContext, RoleContext, RoleContextType, ThemeProvider } from '@services'

const navigate = jest.fn()

describe('Test the Home page-1', () => {
  jest.useFakeTimers()
  jest.mock('@common/hooks', () => ({
    ...jest.requireActual('@common/hooks'),
    useMediaQuery: jest.fn().mockReturnValue(true)
  }))

  test('fetching Course returns no courses', async () => {
    mockServices.fetchCourses.mockResolvedValueOnce({ courses: [] })

    const { getByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(getByText('pages.home.noCourses')).toBeInTheDocument()
    })
  })
})

describe('Test the Home page-2', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('fetching Course throws error', async () => {
    mockServices.fetchCourses.mockRejectedValueOnce(new Error('Error'))

    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      return
    })

    const { container } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('MuiSkeleton')
    })
  })

  test('render page', () => {
    const result = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(result).toBeTruthy()
  })

  test('click on course navigates to course page', async () => {
    const { getAllByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )
    await waitFor(() => {
      act(() => {
        const course = getAllByText('pages.home.courseButton')
        fireEvent.click(course[0])
        expect(navigate).toHaveBeenCalledWith('/course/1')
      })
    })
  })

  test('students do not see create course button', async () => {
    const studentContext = {
      isStudentRole: true,
      isCourseCreatorRole: false
    } as RoleContextType

    const { queryByText } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <RoleContext.Provider value={studentContext}>
              <Home />
            </RoleContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      act(() => {
        expect(queryByText('create-course-button')).not.toBeInTheDocument()
      })
    })
  })

  test('course creator can see create course button and open create course modal', async () => {
    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <RoleContext.Provider value={courseCreatorContext}>
              <Home />
            </RoleContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('create-course-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-course-button'))
        expect(getByTestId('create-course-modal-close-button')).toBeInTheDocument()
      })
    })
  })

  test('course creator can fill out create course details and close modal', async () => {
    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <RoleContext.Provider value={courseCreatorContext}>
              <Home />
            </RoleContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('create-course-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-course-button'))
        expect(getByTestId('create-course-modal-next-step')).toBeInTheDocument()
        expect(getByTestId('create-course-modal-close-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-course-modal-close-button'))
      })
    })
    await waitFor(() => {
      act(() => {
        expect(queryByTestId('create-course-modal-close-button')).not.toBeInTheDocument()
      })
    })
  })

  test('fetching User throws error', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    const { container } = render(
      <ThemeProvider>
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain('MuiSkeleton')
    })
  })
})
