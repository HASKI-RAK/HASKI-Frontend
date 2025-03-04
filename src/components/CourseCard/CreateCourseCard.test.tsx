import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CreateCourseCard from './CreateCourseCard'

describe('CreateCourseCard Component', () => {
  const mockSetCreateCourseModalOpen = jest.fn()
  const mockHandleCloseCourseModal = jest.fn()
  const mockSetActiveStepCreateCourseModal = jest.fn()

  const defaultProps = {
    setCreateCourseModalOpen: mockSetCreateCourseModalOpen,
    createCourseModalOpen: false,
    handleCloseCourseModal: mockHandleCloseCourseModal,
    activeStepCreateCourseModal: 0,
    setActiveStepCreateCourseModal: mockSetActiveStepCreateCourseModal
  }

  test('renders the create course button', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateCourseCard {...defaultProps} />
      </MemoryRouter>
    )

    const createCourseButton = getByTestId('create-course-button')
    expect(createCourseButton).toBeInTheDocument()
  })

  test('calls setCreateCourseModalOpen when clicking the button', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateCourseCard {...defaultProps} />
      </MemoryRouter>
    )

    const createCourseButton = getByTestId('create-course-button')
    fireEvent.click(createCourseButton)

    expect(mockSetCreateCourseModalOpen).toHaveBeenCalledWith(true)
  })

  test('renders CreateCourseModal when open', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateCourseCard {...defaultProps} createCourseModalOpen={true} />
      </MemoryRouter>
    )

    expect(getByTestId('create-course-modal-close-button')).toBeInTheDocument()
  })

  test('calls handleCloseCourseModal when modal close function is triggered', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateCourseCard {...defaultProps} createCourseModalOpen={true} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('create-course-modal-close-button')) // Simulating modal interaction
    expect(mockHandleCloseCourseModal).toHaveBeenCalled()
  })
})
