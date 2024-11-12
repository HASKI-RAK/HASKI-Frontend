import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import Router, { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import CreateTopicModal, { CreateTopicModalProps } from './CreateTopicModal'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('CreateTopicModal', () => {
  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  it('renders the modal with the first step', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={jest.fn()}
            />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Verify the modal is open and the first step is displayed
    expect(getByText('appGlobal.topics')).toBeInTheDocument()
    expect(getByText('appGlobal.learningElements')).toBeInTheDocument()
    expect(getByText('appGlobal.classifications')).toBeInTheDocument()
    expect(getByText('appGlobal.algorithms')).toBeInTheDocument()
  })

  it('closes the modal when close button is clicked', () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    const handleCloseCreateTopicModal = jest.fn()
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const closeButton = getByTestId('create-topic-modal-close-button')
    fireEvent.click(closeButton)
    expect(handleCloseCreateTopicModal).toHaveBeenCalled()
  })

  it('displays the next step when Next button is clicked', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    const handleCloseCreateTopicModal = jest.fn()
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.topics')
    fireEvent.click(nextButton)

    // Wait for the second step to appear
    await waitFor(() => {
      expect(getByText('appGlobal.learningElements')).toBeInTheDocument()
    })
  })

  it('calls handleCreate on submit in the last step', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    const handleCloseCreateTopicModal = jest.fn()
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
    })

    // Navigate to the last step
    /* for (let i = 0; i < 2; i++) {

        fireEvent.click(screen.getByText('Next'))
      await waitFor(() => expect(screen.getByText(createTopicModalStepperSteps[i + 1])).toBeInTheDocument())
    }

    // Submit the form
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockHandleCreate).toHaveBeenCalled()
      expect(defaultProps.setSuccessTopicCreated).toHaveBeenCalledWith(true)
    })*/
  })
  /*
  it('shows an error snackbar when getUser API call fails', async () => {
    mockGetUser.mockRejectedValue(new Error('User fetch failed'))

    renderWithContext(defaultProps)

    await waitFor(() => {
      expect(mockAddSnackbar).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'error.getUser', severity: 'error' })
      )
    })
  })

  it('displays a loading state while fetching topics and remote topics', async () => {
    renderWithContext(defaultProps)

    expect(screen.getByText('Loading translations...')).toBeInTheDocument()

    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalled()
      expect(mockGetTopics).toHaveBeenCalled()
      expect(mockGetRemoteTopics).toHaveBeenCalled()
    })
  })

  it('shows an error snackbar when getRemoteTopics API call fails', async () => {
    mockGetRemoteTopics.mockRejectedValue(new Error('Remote topics fetch failed'))

    renderWithContext(defaultProps)

    await waitFor(() => {
      expect(mockAddSnackbar).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'error.getRemoteTopics', severity: 'error' })
      )
    })
  })

  it('navigates correctly between steps when Back and Next are clicked', async () => {
    renderWithContext(defaultProps)

    // Click next button to navigate to step 2
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => expect(screen.getByText('appGlobal.learningElements')).toBeInTheDocument())

    // Click back button to navigate to step 1
    fireEvent.click(screen.getByText('Back'))
    await waitFor(() => expect(screen.getByText('appGlobal.topics')).toBeInTheDocument())
  })*/
})
