import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics } from '@core'
import CreateLearningElementClassificationsStep from './CreateLearningElementClassificationsStep'

describe('CreateLearningElementClassificationsStep', () => {
  const mockOnNext = jest.fn()
  const mockOnBack = jest.fn()
  const mockHandleLearningElementClassification = jest.fn()

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
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
    ],
    2: [{ lms_id: 201, lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
  }

  const selectedLearningElementsClassification = {
    1: [
      { lms_id: 101, classification: 'KÜ', lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
      { lms_id: 102, classification: '', lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
    ],
    2: [{ lms_id: 201, classification: 'EK', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
  }

  it('renders the CreateLearningElementClassificationTable and buttons', () => {
    const { t } = useTranslation()
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('appGlobal.next')).toBeInTheDocument()
  })

  it('disables the Next button when not all classifications are set', () => {
    const { t } = useTranslation()
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    expect(nextButton).toBeDisabled()
  })

  it('enables the Next button when all classifications are set', () => {
    const { t } = useTranslation()
    const updatedLearningElementsClassification = {
      1: [
        { lms_id: 101, classification: 'KÜ', lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
        { lms_id: 102, classification: 'EK', lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
      ],
      2: [{ lms_id: 201, classification: 'EK', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
    }

    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={updatedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    expect(nextButton).not.toBeDisabled()
  })

  it('calls onBack when the Back button is clicked', () => {
    const { t } = useTranslation()
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    const backButton = getByText('appGlobal.back')
    fireEvent.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it('calls onNext when the Next button is clicked', async () => {
    const { t } = useTranslation()
    const updatedLearningElementsClassification = {
      1: [
        { lms_id: 101, classification: 'KÜ', lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
        { lms_id: 102, classification: 'EK', lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
      ],
      2: [{ lms_id: 201, classification: 'EK', lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity' }]
    }

    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={updatedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.next')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  it('renders the CreateLearningElementClassificationTable with correct props', () => {
    const { t } = useTranslation()
    const { getByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationsStep
          selectedTopics={selectedTopics}
          selectedLearningElements={selectedLearningElements}
          selectedLearningElementsClassification={selectedLearningElementsClassification}
          handleLearningElementClassification={mockHandleLearningElementClassification}
          onNext={mockOnNext}
          onBack={mockOnBack}
          nextButtonText={t('appGlobal.next')}
        />
      </MemoryRouter>
    )

    expect(getByText('appGlobal.back')).toBeInTheDocument()
    expect(getByText('appGlobal.next')).toBeInTheDocument()
  })
})
