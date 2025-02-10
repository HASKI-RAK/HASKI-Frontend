import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { CreateCourseTable } from '@components'
import { RemoteCourse } from '@core'
import { AuthContext } from '@services'

const navigate = jest.fn()
jest.useFakeTimers()

describe('CreateCourseTable', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  const selectedCourse = {
    enddate: 1702166400,
    fullname: 'Kurs-1',
    id: 2,
    shortname: 'kurs',
    startdate: 1670630400,
    timecreated: 1670578503,
    timemodified: 1670578503
  }

  const mockOnCourseSelect = jest.fn((_course: RemoteCourse) => {})

  it('should render the CreateCourseTable', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  })

  it('should select the first available remote course', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        expect(getByText('Kurs-1')).toBeInTheDocument()
        fireEvent.click(getByText('Kurs-1'))
        expect(getByText('Kurs-2')).toBeInTheDocument()
        fireEvent.click(getByText('Kurs-2'))
      })
    })
  })

  it('should display no courses, if no available courses found', async () => {
    mockServices.fetchCourses = jest.fn().mockImplementationOnce(() => Promise.resolve([]))

    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        expect(getByText('components.CreateCourseTable.noCoursesFound')).toBeInTheDocument()
      })
    })
  })

  it('should display no courses, if no available courses found and no courses created', async () => {
    //mockServices.fetchCourses = jest.fn().mockImplementationOnce(() => Promise.resolve({ courses: [] }))
    mockServices.fetchRemoteCourses = jest.fn().mockImplementationOnce(() => Promise.resolve([]))

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
      })
    })
  })

  it('should display no courses, if fetching Remote courses returns error', async () => {
    //mockServices.fetchCourses = jest.fn().mockImplementationOnce(() => Promise.resolve({ courses: [] }))
    mockServices.fetchRemoteCourses.mockImplementationOnce(() => Promise.reject(new Error('error')))

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
      })
    })
  })

  it('should display no courses, if fetching courses returns error', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() => Promise.reject(new Error('error')))

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseTable onCourseSelect={mockOnCourseSelect} selectedCourse={selectedCourse} />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => {
      act(() => {
        expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
        expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
      })
    })
  })
})
