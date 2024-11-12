import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'
import { RemoteLearningElement, RemoteTopics } from '@core'
import CreateLearningElementClassificationTable, {
  CreateLearningElementClassificationTableOptionsType,
  LearningElementWithClassification
} from './CreateLearningElementClassificationTable'

jest.mock('react-i18next', () => ({
  // This mock makes sure any components using the useTranslation hook can use it without warnings
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'components.CreateLearningElementClassificationTable.classifications') {
        return [
          { name: 'Select Classification', key: 'noKey', disabled: true },
          { name: 'LZ - Learning Objective', key: 'LZ', disabled: false },
          { name: 'KÜ - Overview', key: 'KÜ', disabled: false }
        ]
      }
      return key // Return the key itself if no specific mock value is provided
    },
    i18n: {
      getFixedT: () => (key: string) => key
      // Other properties your component may use
    }
  })
}))
describe('CreateLearningElementClassificationTable', () => {
  const mockOptions: CreateLearningElementClassificationTableOptionsType = [
    {
      name: 'Select Classification',
      key: 'noKey',
      disabled: true
    },
    {
      name: 'LZ - Learning Objective',
      key: 'LZ',
      disabled: false
    },
    {
      name: 'KÜ - Overview',
      key: 'KÜ',
      disabled: false
    },
    {
      name: 'FO - Forum',
      key: 'FO',
      disabled: false
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
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'noKey' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }
    ]
  }

  it('renders a loading skeleton when there are no learning elements classified', () => {
    render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          LearningElements={{}}
          LearningElementsClassification={{}}
          onLearningElementChange={mockOnLearningElementChange}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    expect(screen.getByTestId('SkeletonList Element-1')).toBeInTheDocument()
  })

  /*it('renders topics with learning elements and no test classifications', () => {
    const { getAllByRole, getByText, getByLabelText, getAllByText, queryByLabelText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          LearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
        />
      </MemoryRouter>
    )

    expect(getByText('Topic 1')).toBeInTheDocument()
    expect(getByLabelText('Element 1')).toBeInTheDocument()
    expect(getByLabelText('Element 2')).toBeInTheDocument()
    expect(queryByLabelText('LZ - Learning Objective')).not.toBeInTheDocument()

    const button = getAllByRole('combobox')[0]
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    expect(menuItems).toHaveLength(1)
  })*/

  it('renders topics with learning elements and classifications', () => {
    const { getAllByRole, getByText, getByLabelText, getAllByText, queryByLabelText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          LearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    expect(getByText('Topic 1')).toBeInTheDocument()
    expect(getByLabelText('Element 1')).toBeInTheDocument()
    expect(getByLabelText('Element 2')).toBeInTheDocument()
    expect(queryByLabelText('LZ - Learning Objective')).not.toBeInTheDocument()

    const button = getAllByRole('combobox')[0]
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    expect(menuItems).toHaveLength(mockOptions.length)
  })

  it('calls handleClassificationChange when classification is changed in the dropdown', async () => {
    const { getAllByRole, getAllByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          LearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    const button = getAllByRole('combobox')[0]
    fireEvent.mouseDown(button)
    const newClassificationOption = getAllByText('LZ - Learning Objective')
    fireEvent.click(newClassificationOption[0])

    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('classification to another classification', async () => {
    const { getAllByRole, getAllByText } = render(
      <MemoryRouter>
        <CreateLearningElementClassificationTable
          selectedTopics={mockSelectedTopics}
          LearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
          options={mockOptions}
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
          LearningElements={mockLearningElements}
          LearningElementsClassification={mockLearningElementsClassification}
          onLearningElementChange={mockOnLearningElementChange}
          options={mockOptions}>
          <div data-testid="child">Child Content</div>
        </CreateLearningElementClassificationTable>
      </MemoryRouter>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
