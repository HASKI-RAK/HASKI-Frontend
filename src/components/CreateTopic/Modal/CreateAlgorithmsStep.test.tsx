import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics } from '@core'
import CreateAlgorithmsStep from './CreateAlgorithmsStep'

describe('CreateAlgorithmsStep', () => {
  const mockOnBack = jest.fn()
  const mockOnSubmit = jest.fn()
  const mockHandleAlgorithmChange = jest.fn()

  const mockLearningElement = {
    lms_id: 101,
    lms_learning_element_name: 'Element 1',
    lms_activity_type: 'Activity'
  }

  const selectedTopics: RemoteTopics[] = [
    { topic_lms_id: 1, topic_lms_name: 'Topic 1', lms_learning_elements: [mockLearningElement] },
    { topic_lms_id: 2, topic_lms_name: 'Topic 2', lms_learning_elements: [mockLearningElement] }
  ]

  const selectedLearningElementsClassification = {
    1: [
      { lms_id: 101, classification: 'KÜ', lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
      { lms_id: 102, classification: 'EK', lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
    ],
    2: [{ lms_id: 201, classification: 'BE', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
  }

  const selectedAlgorithms = {
    1: { topicName: 'Topic 1', algorithmShortName: 'aco' },
    2: { topicName: 'Topic 2', algorithmShortName: 'default' }
  }

  it('renders the CreateAlgorithmTable and buttons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={false}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('components.CreateTopicModal.createTopics')).toBeInTheDocument()
  })

  it('disables the Submit button if algorithms are not selected for all topics', () => {
    const incompleteAlgorithms = {
      1: { topicName: 'Topic 1', algorithmShortName: 'aco' },
      2: { topicName: 'Topic 2', algorithmShortName: 'noKey' }
    }

    const { getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={incompleteAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={false}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    const submitButton = getByText('components.CreateTopicModal.createTopics')
    expect(submitButton).toBeDisabled()
  })

  it('disables the Submit button if createTopicIsSending is true', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={true}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    expect(queryByText('components.CreateTopicModal.createTopics')).not.toBeInTheDocument()
  })

  it('shows a loading spinner when createTopicIsSending is true', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={true}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('calls onBack when the Back button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={false}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    const backButton = getByText('appGlobal.back')
    fireEvent.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it('calls onSubmit when the Submit button is clicked', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={false}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    const submitButton = getByText('components.CreateTopicModal.createTopics')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

  it('renders CreateAlgorithmTable with correct props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmsStep
          selectedTopics={selectedTopics}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          selectedAlgorithms={selectedAlgorithms}
          handleAlgorithmChange={mockHandleAlgorithmChange}
          createTopicIsSending={false}
          successTopicCreated={false}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('components.CreateTopicModal.createTopics')).toBeInTheDocument()
  })
})
