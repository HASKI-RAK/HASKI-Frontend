import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarContext } from '@services'
import CreateCourseModal from './CreateCourseModal'

jest.useFakeTimers()

describe('[HASKI-REQ-0035] CreateCourseModal', () => {
  const mockHandleCloseCreateCourseModal = jest.fn()
  const mockSetActiveStepCreateCourseModal = jest.fn()

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

  it('does not render modal when not open', () => {
    const { queryByTestId, queryByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    expect(queryByTestId('create-course-modal-close-button')).not.toBeInTheDocument()
    expect(queryByText('components.CreateCourseModal.createCourse')).not.toBeInTheDocument()
  })

  it('renders the modal with the first step', () => {
    const { getByTestId, getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    expect(getByTestId('create-course-modal-close-button')).toBeInTheDocument()
    expect(getByText('components.CreateCourseModal.createCourse')).toBeInTheDocument()
  })

  it('closes the modal when the close button is clicked', () => {
    const { getByTestId } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    fireEvent.click(getByTestId('create-course-modal-close-button'))

    expect(mockHandleCloseCreateCourseModal).toHaveBeenCalled()
  })

  it('disables the next button if no course is selected', () => {
    const { getByTestId } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const nextButton = getByTestId('create-course-modal-next-step')
    expect(nextButton).toBeDisabled()
  })

  it('enables the next button when a course is selected', async () => {
    const { getByTestId, getByText, getAllByRole } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      act(() => {
        expect(getAllByRole('button')).toHaveLength(4)
        expect(getByText('Kurs-1')).toBeInTheDocument()
        fireEvent.click(getAllByRole('button')[1])
      })
    })
    await waitFor(() => {
      act(() => {
        const nextButton = getByTestId('create-course-modal-next-step')
        expect(nextButton).not.toBeDisabled()
      })
    })
  })

  it('moves to the next step when the next button is clicked', async () => {
    const { getByText, getAllByRole } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={0}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      act(() => {
        expect(getAllByRole('button')).toHaveLength(4)
        expect(getByText('Kurs-1')).toBeInTheDocument()
        fireEvent.click(getAllByRole('button')[1])
      })
    })
    await waitFor(() => {
      act(() => {
        const nextButton = getByText('components.CreateCourseModal.createCourse')
        expect(nextButton).not.toBeDisabled()
        fireEvent.click(getByText('components.CreateCourseModal.createCourse'))
      })
    })
    await waitFor(() => {
      act(() => {
        expect(mockSetActiveStepCreateCourseModal).toHaveBeenCalledWith(1)
      })
    })
  })

  it('create Function is called when clicked', async () => {
    const { getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={1}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      act(() => {
        const createButton = getByText('components.CreateCourseModal.createCourse')
        expect(createButton).not.toBeDisabled()
        fireEvent.click(getByText('components.CreateCourseModal.createCourse'))
      })
    })
    await waitFor(() => {
      act(() => {
        expect(getByText('components.CreateCourseModal.createCourse')).not.toBeDisabled()
      })
    })
  })

  it('clicks on back button and goes to first activeStep', async () => {
    const { getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={1}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      act(() => {
        const backButton = getByText('appGlobal.back')
        expect(backButton).not.toBeDisabled()
        fireEvent.click(backButton)
      })
    })
    await waitFor(() => {
      act(() => {
        expect(mockSetActiveStepCreateCourseModal).toHaveBeenCalledWith(0)
        expect(getByText('components.CreateCourseModal.createCourse')).not.toBeDisabled()
      })
    })
  })

  it('handles error on postCourse error', async () => {
    mockServices.postCourse.mockImplementationOnce(() => Promise.reject(new Error('Error')))

    const { getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <CreateCourseModal
            openCreateCourseModal={true}
            handleCloseCreateCourseModal={mockHandleCloseCreateCourseModal}
            activeStepCreateCourseModal={1}
            setActiveStepCreateCourseModal={mockSetActiveStepCreateCourseModal}
          />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      act(() => {
        const createButton = getByText('components.CreateCourseModal.createCourse')
        expect(createButton).not.toBeDisabled()
        fireEvent.click(getByText('components.CreateCourseModal.createCourse'))
      })
    })
    await waitFor(() => {
      act(() => {
        expect(getByText('components.CreateCourseModal.createCourse')).not.toBeDisabled()
      })
    })
  })
})
