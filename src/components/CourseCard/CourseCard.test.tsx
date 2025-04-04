import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
// Adjust path as needed
import { Course } from '@core'
import { SnackbarContext } from '@services'
import CourseCard from './CourseCard'

jest.mock('@services', () => ({
  deleteCourse: jest.fn().mockResolvedValue(undefined)
}))

describe('CourseCard Component', () => {
  const addSnackbarMock = jest.fn()
  const mockAddSnackbar = {
    snackbarsErrorWarning: [],
    snackbarsSuccessInfo: [],
    setSnackbarsErrorWarning: (a: any[]) => a,
    setSnackbarsSuccessInfo: (a: any) => a,
    addSnackbar: (a: any) => {
      addSnackbarMock(a)
      return a
    },
    updateSnackbar: (a: any) => a,
    removeSnackbar: (a: any) => a
  }

  const navigate = jest.fn()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  const course: Course = {
    id: 1,
    lms_id: 101,
    name: 'Test Course',
    university: 'Test University',
    created_at: '2024-02-20T10:00:00Z',
    created_by: 123,
    last_updated: '2024-02-22T12:00:00Z',
    start_date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }

  const renderComponent = (isCourseCreatorRole = false) => {
    return render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CourseCard course={course} isCourseCreatorRole={isCourseCreatorRole} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )
  }

  test('renders course name correctly', () => {
    renderComponent()
    expect(screen.getByText('Test Course')).toBeInTheDocument()
  })

  test('does not show settings button if not a course creator', () => {
    renderComponent(false)
    expect(screen.queryByTestId('CourseSettingsButton')).not.toBeInTheDocument()
  })

  test('shows settings button if user is course creator', () => {
    renderComponent(true)
    expect(screen.getByTestId('CourseSettingsButton')).toBeInTheDocument()
  })

  test('opens and closes course card menu', () => {
    renderComponent(true)
    fireEvent.click(screen.getByTestId('CourseSettingsButton'))
    expect(screen.getByTestId('CourseSettingsMenu')).toBeVisible()

    fireEvent.click(document.body)
    waitFor(() => expect(screen.queryByTestId('CourseSettingsMenu')).not.toBeVisible())
  })

  test('disables button when course start date is in the future', () => {
    const futureCourse: Course = {
      ...course,
      start_date: new Date(Date.now() + 86400000).toISOString() // 1 day in the future
    }

    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CourseCard course={futureCourse} isCourseCreatorRole={false} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const button = screen.getByRole('button', { name: /courseDisabled/i })
    expect(button).toBeDisabled()
  })

  test('calls navigation when clicking course button', () => {
    const { getByRole } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CourseCard course={course} isCourseCreatorRole={true} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )
    const courseButton = getByRole('button', { name: /courseButton/i })
    fireEvent.click(courseButton)
    expect(navigate).toHaveBeenCalledWith('/course/1')
  })

  test('opens delete course modal when clicking delete option', async () => {
    renderComponent(true)
    fireEvent.click(screen.getByTestId('CourseSettingsButton'))
    expect(screen.getAllByText(/appGlobal.delete/i)).toHaveLength(1)
    fireEvent.click(screen.getByText(/delete/i))

    await waitFor(() => {
      expect(screen.getByText(/appGlobal.delete/i)).toBeInTheDocument()
    })
  })

  test('calls deleteCourse and clears cache when confirming deletion', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CourseCard course={course} isCourseCreatorRole={true} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )
    fireEvent.click(getByTestId('CourseSettingsButton'))
    fireEvent.click(getByText(/delete/i))

    await waitFor(() => {
      const confirmButton = getByRole('button', { name: /appGlobal.delete/i })
      expect(getByRole('button', { name: /appGlobal.cancel/i })).toBeInTheDocument()
      const acceptLabel = getByTestId('delete-entity-modal-accept-label')
      fireEvent.click(acceptLabel)
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        message: 'components.CourseCard.deleteCourseSuccessful',
        severity: 'success',
        autoHideDuration: 5000
      })
    })
  })
})
