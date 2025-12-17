import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'
import { ReactFlowProvider } from 'reactflow'
import { RemoteLearningElement } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import CreateLearningElementModal from './CreateLearningElementModal'
import { useState } from 'react'

jest.useFakeTimers()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('[HASKI-REQ-0037] CreateLearningElementModal Component', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

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
  const mockSetActiveStep = jest.fn()

  test('returns without courseId and topicId', async () => {
    render(
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
              selectedLearningElementSolution={{}}
              selectedSolutions={{}}
              setSelectedSolutions={jest.fn()}
              setSelectedLearningElementSolution={jest.fn()}
              activeStep={0}
              setActiveStep={mockSetActiveStep}
            />
          </SnackbarContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
  })

  test('Modal is closed without given parameters', async () => {
    render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <SnackbarContext.Provider value={mockAddSnackbar}>
            <CreateLearningElementModal
              currentTopicLmsId={1}
              handleCloseCreateTopicModal={jest.fn()}
              selectedLearningElements={{}}
              setSelectedLearningElements={jest.fn()}
              selectedLearningElementsClassification={{}}
              setSelectedLearningElementsClassification={jest.fn()}
              selectedLearningElementSolution={{}}
              selectedSolutions={{}}
              setSelectedSolutions={jest.fn()}
              setSelectedLearningElementSolution={jest.fn()}
              activeStep={0}
              setActiveStep={mockSetActiveStep}
            />
          </SnackbarContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
  })

  test('renders the modal when closed', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

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
              selectedLearningElementSolution={{}}
              selectedSolutions={{}}
              setSelectedSolutions={jest.fn()}
              setSelectedLearningElementSolution={jest.fn()}
              activeStep={0}
              setActiveStep={mockSetActiveStep}
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

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
                selectedLearningElementSolution={{}}
                selectedSolutions={{}}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={0}
                setActiveStep={mockSetActiveStep}
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

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
                selectedLearningElementSolution={{}}
                selectedSolutions={{}}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={0}
                setActiveStep={mockSetActiveStep}
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

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
                selectedLearningElementSolution={{}}
                selectedSolutions={{}}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={0}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    expect(getByText('appGlobal.back')).toBeDisabled()
  })

  test('displays step 1 (CreateLearningElementsStep) initially, with 0 Learning elements', () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    mockServices.fetchRemoteTopics.mockImplementationOnce(() =>
      Promise.resolve({
        lms_learning_elements: [],
        topic_lms_id: 3,
        topic_lms_name: 'General'
      })
    )

    const { getByText, queryByRole } = render(
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{}}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={0}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    expect(queryByRole('checkbox')).not.toBeInTheDocument()
    expect(getByText('appGlobal.back')).toBeDisabled()
  })

  test('navigates to step 2 (CreateLearningElementClassificationsStep) when clicking Next', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

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
                selectedLearningElementSolution={{}}
                selectedSolutions={{}}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
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

  test('navigates to step 3 (CreateLearningElementSolutionsStep) when clicking Next', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    const handleSetActiveStep = jest.fn()

    const selectedLearningElements: { [key: number]: RemoteLearningElement[] } = {
      3: [
        // ✅ Object with numeric keys
        { lms_id: 38, lms_learning_element_name: 'superKnowledge.pdf', lms_activity_type: 'resource' },
        { lms_id: 39, lms_learning_element_name: 'Strategie Übung - Leicht', lms_activity_type: 'h5pactivity' }
      ]
    }

    const selectedLearningElementsClassification = {
      1: [
        { lms_id: 101, classification: 'KÜ', lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
        { lms_id: 102, classification: '', lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
      ],
      3: [{ lms_id: 201, classification: 'EK', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
    }

    const selectedSolutions = {
      3: [
        {
          solutionLmsId: 1,
          solutionLmsName: 'Solution 1',
          solutionLmsType: 'h5p'
        }
      ]
    }

    const { getByText, findByText } = render(
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
                selectedLearningElementsClassification={selectedLearningElementsClassification}
                setSelectedLearningElementsClassification={jest.fn()}
                selectedLearningElementSolution={{}}
                selectedSolutions={selectedSolutions}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={1}
                setActiveStep={handleSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    await findByText('Element 3')

    fireEvent.click(getByText('appGlobal.next'))

    expect(handleSetActiveStep).toHaveBeenCalled()
  })

  test('creates LearningElement in existing topic with solution', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    const selectedLearningElements: { [key: number]: RemoteLearningElement[] } = {
      3: [
        // ✅ Object with numeric keys
        { lms_id: 38, lms_learning_element_name: 'superKnowledge.pdf', lms_activity_type: 'resource' },
        { lms_id: 39, lms_learning_element_name: 'Strategie Übung - Leicht', lms_activity_type: 'h5pactivity' }
      ]
    }

    const selectedLearningElementsClassification = {
      3: [{ lms_id: 201, classification: 'EK', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
    }

    const selectedSolutions = {
      3: [
        {
          solutionLmsId: 1,
          solutionLmsName: 'Solution 1',
          solutionLmsType: 'h5p'
        }
      ]
    }

    const selectedLearningElementSolution = {
      3: [
        {
          learningElementLmsId: 38,
          learningElementName: 'what',
          solutionLmsId: 1,
          solutionLmsType: 'h5p'
        }
      ]
    }

    const mockHandleCloseCreateTopicModal = jest.fn()

    const Wrapper = () => {
      const [activeStep, setActiveStep] = useState(2)

      return (
        <CreateLearningElementModal
          openCreateTopicModal={true}
          currentTopicLmsId={3}
          handleCloseCreateTopicModal={mockHandleCloseCreateTopicModal}
          selectedLearningElements={selectedLearningElements}
          setSelectedLearningElements={jest.fn()}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          setSelectedLearningElementsClassification={jest.fn()}
          selectedLearningElementSolution={selectedLearningElementSolution}
          selectedSolutions={selectedSolutions}
          setSelectedSolutions={jest.fn()}
          setSelectedLearningElementSolution={jest.fn()}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )
    }

    const { getByText } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course/2/topic/1']}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <Wrapper />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.back'))
    })

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      fireEvent.click(getByText('components.CreateLearningElementModal.createLearningElements'))
      expect(mockHandleCloseCreateTopicModal).toHaveBeenCalled()
    })
  })

  test('calls handleCreateLearningElementsInExistingTopic and closes modal on final step', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    const handleSetActiveStep = jest.fn()

    const { getByText } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/2', '/topic', '/1']}>
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
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

    act(() => {
      // Replace runAllTimers with a more controlled approach
      jest.advanceTimersByTime(5000) // Adjust timing as needed
    })

    await waitFor(() => {
      expect(mockHandleCloseCreateTopicModal).toHaveBeenCalled()
    })
  })

  test('clicking directly on stepperbutton', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    const handleSetActiveStep = jest.fn()

    const { getAllByTestId } = render(
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
                selectedLearningElementSolution={{}}
                setSelectedLearningElementSolution={jest.fn()}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                activeStep={1}
                setActiveStep={handleSetActiveStep}
              />
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    const stepperButtons = getAllByTestId('create-learning-element-modal-stepper')
    fireEvent.click(stepperButtons[0])

    await waitFor(() => {
      expect(handleSetActiveStep).toHaveBeenCalled()
    })
  })

  test('handles errors when fetching LearningPathElementSolution topics', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    mockServices.fetchLearningPathElementSolution.mockImplementationOnce(() => {
      throw new Error('fetchLearningPathElementSolution error')
    })

    await act(async () => {
      render(
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={1}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })

  test('handles errors when fetching remote topics', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    mockServices.fetchRemoteTopics.mockImplementationOnce(() => {
      throw new Error('fetchRemoteTopics error')
    })

    await act(async () => {
      render(
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={1}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })

  test('handles errors when fetching learning path elements', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('fetchLearningPathElement error')
    })

    await act(async () => {
      render(
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={1}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })

  test('handles errors when fetching user', async () => {
    //mockServices fetch user throw error
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('fetchUser error')
    })

    await act(async () => {
      render(
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
                selectedLearningElementSolution={{}}
                selectedSolutions={{ 3: [] }}
                setSelectedSolutions={jest.fn()}
                setSelectedLearningElementSolution={jest.fn()}
                activeStep={1}
                setActiveStep={mockSetActiveStep}
              />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })
})
