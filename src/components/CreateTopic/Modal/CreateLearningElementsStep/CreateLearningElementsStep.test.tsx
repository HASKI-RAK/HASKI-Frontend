import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics } from '@core'
import CreateLearningElementsStep from './CreateLearningElementsStep'

describe('CreateLearningElementsStep', () => {
  const mockOnNext = jest.fn()
  const mockOnBack = jest.fn()
  const mockHandleLearningElementChange = jest.fn()
  const mockSetSelectAllLearningElementsChecked = jest.fn()

  const mockLearningElement = {
    lms_id: 101,
    lms_learning_element_name: 'Element 1',
    lms_activity_type: 'Activity'
  }

  const selectedTopics: RemoteTopics[] = [
    { topic_lms_id: 1, topic_lms_name: 'Topic 1', lms_learning_elements: [mockLearningElement] },
    { topic_lms_id: 2, topic_lms_name: 'Topic 2', lms_learning_elements: [mockLearningElement] }
  ]

  const selectedLearningElements = {
    1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }],
    2: []
  }

  it('renders the CreateLearningElementTable and buttons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('appGlobal.next')).toBeInTheDocument()
  })

  it('disables the Next button if not all topics have selected learning elements', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    expect(nextButton).toBeDisabled()
  })

  it('enables the Next button if all topics have selected learning elements', () => {
    const updatedLearningElements = {
      1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }],
      2: [{ lms_id: 201, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
    }

    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={updatedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    expect(nextButton).not.toBeDisabled()
  })

  it('calls onBack when the Back button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    const backButton = getByText('appGlobal.back')
    fireEvent.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it('calls onNext when the Next button is clicked', async () => {
    const updatedLearningElements = {
      1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }],
      2: [{ lms_id: 201, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
    }

    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={updatedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  it('renders the CreateLearningElementTable with the correct props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          handleLearningElementChange={mockHandleLearningElementChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
          setSelectAllLearningElementsChecked={mockSetSelectAllLearningElementsChecked}
          selectAllLearningElementsChecked={false}
          selectedSolutions={{}}
          onSolutionChange={jest.fn()}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('appGlobal.next')).toBeInTheDocument()
  })
})
