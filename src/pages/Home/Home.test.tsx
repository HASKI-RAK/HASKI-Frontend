import '@testing-library/jest-dom'
import { fireEvent, getAllByRole, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '@pages'
import { AuthContext, RoleContextType } from '@services'
import RoleContext from '../../services/RoleContext/RoleContext'

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
      expect(container.innerHTML).toContain('MuiSkeleton')
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
    const { getAllByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Home />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        const course = getAllByText('pages.home.courseButton')
        fireEvent.click(course[0])
        expect(navigate).toHaveBeenCalledWith('/course/1')
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
      expect(container.innerHTML).toContain('MuiSkeleton')
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

  test('students do not see create Course Button', async () => {
    const studentContext = {
      isStudentRole: true,
      isCourseCreatorRole: false
    } as RoleContextType

    const { queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={studentContext}>
            <Home />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
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
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <Home />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('create-course-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-course-button'))
        expect(getByTestId('create-course-modal-close-button')).toBeInTheDocument()
        //expect(getAllByTestId('settings-menu')[0]).toBeInTheDocument()
      })
    })
  })

  test('course creator can fill out create course details and close modal', async () => {
    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <Home />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
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
