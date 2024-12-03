import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteLearningElement, RemoteTopics } from '@core'
import CreateLearningElementClassificationTable, {
  CreateLearningElementClassificationTableOptionsType,
  LearningElementWithClassification
} from './CreateLearningElementClassificationTable'

describe('CreateLearningElementClassificationTable', () => {
  const mockOptions: CreateLearningElementClassificationTableOptionsType = [
    {
      name: 'LZ - Learning Objective',
      key: 'LZ'
    },
    {
      name: 'KÜ - Overview',
      key: 'KÜ'
    },
    {
      name: 'FO - Forum',
      key: 'FO'
    },
    {
      name: 'EK - Explanation',
      key: 'EK'
    },
    {
      name: 'AN - Animation',
      key: 'AN'
    },
    {
      name: 'BE - Example',
      key: 'BE'
    },
    {
      name: 'AB - Application Example',
      key: 'AB'
    },
    {
      name: 'ÜB - Exercise',
      key: 'ÜB'
    },
    {
      name: 'SE - Self-Assessment Test',
      key: 'SE'
    },
    {
      name: 'ZL - Additional Literature',
      key: 'ZL'
    },
    {
      name: 'ZF - Summary',
      key: 'ZF'
    },
    {
      name: 'RQ - Reflective Quiz',
      key: 'RQ'
    }
  ]

  const mockOnLearningElementChange = jest.fn()

  // Reset the translation mock for each test

  const mockSelectedTopics: RemoteTopics[] = [
    {
      topic_lms_id: 1,
      topic_lms_name: 'Topic 1',
      lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
    }
  ]

  const mockLearningElements: { [key: number]: RemoteLearningElement[] } = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
    ]
  }

  const mockLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: '' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }
    ]
  }

  it('renders a loading skeleton when there are no learning elements classified', () => {
    render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={{}}
          LearningElementsClassification={{}}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    expect(screen.getByTestId('SkeletonList Element-1')).toBeInTheDocument()
  })

  it('renders the component with topics and learning elements', () => {
    render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Topic 1')).toBeInTheDocument()
    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText('Element 2')).toBeInTheDocument()
  })

  it('renders the select dropdown with options', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    const selectDropdowns = getAllByRole('combobox')
    expect(selectDropdowns).toHaveLength(2) // One for each Learning Element

    fireEvent.mouseDown(selectDropdowns[0])

    const menuItems = getAllByRole('option', { hidden: true })
    expect(menuItems).toHaveLength(mockOptions.length)
  })

  it('calls handleClassificationChange when classification is changed in the dropdown', async () => {
    const { getAllByRole, getAllByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    const button = getAllByRole('combobox')[0]
    fireEvent.mouseDown(button)
    const newClassificationOption = getAllByText('FO - Forum')
    fireEvent.click(newClassificationOption[0])

    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('classification to another classification', async () => {
    const { getAllByRole, getAllByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    const button = getAllByRole('combobox')[0]
    fireEvent.mouseDown(button)
    const classificationOption = getAllByText('LZ - Learning Objective')
    fireEvent.click(classificationOption[0])
    expect(mockOnLearningElementChange).toHaveBeenCalled()

    fireEvent.mouseDown(button)
    const newClassificationOption = getAllByText('FO - Forum')
    fireEvent.click(newClassificationOption[0])
    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('renders children when provided', () => {
    render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          selectedLearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}>
          <div data-testid="child">Child Content</div>
        </CreateLearningElementClassificationTable>
      </MemoryRouter>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
