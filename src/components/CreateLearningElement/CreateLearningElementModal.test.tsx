import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import { RemoteLearningElement } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import CreateLearningElementModal from './CreateLearningElementModal'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('CreateLearningElementModal Component', () => {
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
  const mockHandleCloseCreateTopicModal = jest.fn()

  test('renders the modal when closed', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const { queryByTestId } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <SnackbarContext.Provider value={mockAddSnackbar}>
            <CreateLearningElementModal
              openCreateTopicModal={false}
              currentTopicLmsId={1}
              handleCloseCreateTopicModal={jest.fn()}
              selectedLearningElements={{}}
              setSelectedLearningElements={jest.fn()}
              selectedLearningElementsClassification={{}}
              setSelectedLearningElementsClassification={jest.fn()}
              activeStep={0}
              setActiveStep={jest.fn()}
            />
          </SnackbarContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
    await waitFor(() => {
      expect(queryByTestId('create-learning-elements-modal-close-button')).not.toBeInTheDocument()
    })
  })

  test('renders the modal when open', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const { getByTestId } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={1}
                handleCloseCreateTopicModal={jest.fn()}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={0}
                setActiveStep={jest.fn()}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
    await waitFor(() => {
      expect(getByTestId('create-learning-elements-modal-close-button')).toBeInTheDocument()
    })
  })

  test('closes the modal when close button is clicked', () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const { getByTestId } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course/1/topic/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={mockHandleCloseCreateTopicModal}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={0}
                setActiveStep={jest.fn()}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    const closeButton = getByTestId('create-learning-elements-modal-close-button')
    fireEvent.click(closeButton)

    expect(mockHandleCloseCreateTopicModal).toHaveBeenCalled()
  })

  test('displays step 1 (CreateLearningElementsStep) initially', () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const { getByText } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={jest.fn()}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={0}
                setActiveStep={jest.fn()}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    expect(getByText('appGlobal.back')).toBeDisabled()
  })

  test('navigates to step 2 (CreateLearningElementClassificationsStep) when clicking Next', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const handleSetActiveStep = jest.fn()

    const selectedLearningElements: { [key: number]: RemoteLearningElement[] } = {
      3: [
        // ✅ Object with numeric keys
        { lms_id: 38, lms_learning_element_name: 'superKnowledge.pdf', lms_activity_type: 'resource' },
        { lms_id: 39, lms_learning_element_name: 'Strategie Übung - Leicht', lms_activity_type: 'h5pactivity' }
      ]
    }

    const { getByText, getAllByRole } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course/2/topic/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={jest.fn()}
                selectedLearningElements={selectedLearningElements}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={0}
                setActiveStep={handleSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    await waitFor(() => {
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[1])
    })

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(handleSetActiveStep).toHaveBeenCalled()
    })
  })

  test('calls handleCreateLearningElementsInExistingTopic and closes modal on final step', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '2' })
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '1' })

    const handleSetActiveStep = jest.fn()

    const selectedLearningElements: { [key: number]: RemoteLearningElement[] } = {
      3: [
        // ✅ Object with numeric keys
        { lms_id: 38, lms_learning_element_name: 'superKnowledge.pdf', lms_activity_type: 'resource' },
        { lms_id: 39, lms_learning_element_name: 'Strategie Übung - Leicht', lms_activity_type: 'h5pactivity' }
      ]
    }

    const selectedLearningElementsClassification = {
      3: [
        {
          lms_id: 38,
          classification: 'KÜ',
          lms_learning_element_name: 'superKnowledge.pdf',
          lms_activity_type: 'resource'
        },
        {
          lms_id: 39,
          classification: 'KÜ',
          lms_learning_element_name: 'Strategie Übung - Leicht',
          lms_activity_type: 'h5pactivity'
        }
      ]
    }

    const { getByText } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={mockHandleCloseCreateTopicModal}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={1}
                setActiveStep={handleSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    const nextButton = getByText(/createLearningElements/i)
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(mockHandleCloseCreateTopicModal).toHaveBeenCalled()
    })
  })

  /*test('handles errors when fetching user or learning path topic', async () => {
    //mockServices fetch user throw error

    await act(async () => {
      const { getByTestId } = render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/2']}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={jest.fn()}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={1}
                setActiveStep={jest.fn()}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(handleError).toHaveBeenCalledWith(
      expect.any(Function),
      mockAddSnackbar,
      'error.fetchUser',
      expect.any(Error),
      3000
    )

    await act(async () => {
      const { getByTestId } = render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/2', '/topic', '/2']}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElementModal
                openCreateTopicModal={true}
                currentTopicLmsId={3}
                handleCloseCreateTopicModal={jest.fn()}
                selectedLearningElements={{}}
                setSelectedLearningElements={jest.fn()}
                selectedLearningElementsClassification={{}}
                setSelectedLearningElementsClassification={jest.fn()}
                activeStep={1}
                setActiveStep={jest.fn()}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(handleError).toHaveBeenCalledWith(
      expect.any(Function),
      mockAddSnackbar,
      'error.fetchLearningPathElement',
      expect.any(Error),
      3000
    )
  })*/
})
