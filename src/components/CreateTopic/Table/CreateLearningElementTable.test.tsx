import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteLearningElement, RemoteTopics } from '@core'
import CreateLearningElementTable from './CreateLearningElementTable'

describe('CreateLearningElementTable', () => {
  const mockOnLearningElementChange = jest.fn(
    (_selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => {}
  )
  const mockSetSelectedAllLearningElementsChecked = jest.fn()

  const mockSelectedTopics: RemoteTopics[] = [
    {
      topic_lms_id: 1,
      topic_lms_name: 'Topic 1',
      lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
    },
    {
      topic_lms_id: 2,
      topic_lms_name: 'Topic 2',
      lms_learning_elements: [{ lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
    }
  ]

  const mockSelectedLearningElements: { [key: number]: RemoteLearningElement[] } = {
    1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
  }

  it('renders a loading skeleton when there are no selected topics', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={[]}
          onLearningElementChange={jest.fn()}
          selectedLearningElements={{}}
          selectAllLearningElementsChecked={false}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}
        />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
  })

  it('renders topics with learning elements checkboxes', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={mockSelectedTopics}
          onLearningElementChange={jest.fn()}
          selectedLearningElements={mockSelectedLearningElements}
          selectAllLearningElementsChecked={false}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}
        />
      </MemoryRouter>
    )

    expect(getByText('Topic 1')).toBeInTheDocument()
    expect(getByText('Topic 2')).toBeInTheDocument()

    expect(getByLabelText('Element 1')).toBeChecked()
    expect(getByLabelText('Element 2')).not.toBeChecked()
  })

  it('calls handleLearningElementCheckboxChange when a checkbox is clicked', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={mockSelectedTopics}
          onLearningElementChange={mockOnLearningElementChange}
          selectedLearningElements={mockSelectedLearningElements}
          selectAllLearningElementsChecked={false}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}
        />
      </MemoryRouter>
    )

    const element2Checkbox = getByLabelText('Element 2')
    fireEvent.click(element2Checkbox)

    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('calls handleSelectAllLearningElements when the "Select All" button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={mockSelectedTopics}
          onLearningElementChange={mockOnLearningElementChange}
          selectedLearningElements={mockSelectedLearningElements}
          selectAllLearningElementsChecked={false}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}
        />
      </MemoryRouter>
    )

    const selectAllButton = getByTestId('createLearningElementTable-Toggle-All-Checkbox')
    fireEvent.click(selectAllButton)

    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('calls handleDeselectAllLearningElements when the "Deselect All" button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={mockSelectedTopics}
          onLearningElementChange={mockOnLearningElementChange}
          selectedLearningElements={mockSelectedLearningElements}
          selectAllLearningElementsChecked={true}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}
        />
      </MemoryRouter>
    )

    const deselectAllButton = getByTestId('createLearningElementTable-Toggle-All-Checkbox')
    fireEvent.click(deselectAllButton)

    expect(mockOnLearningElementChange).toHaveBeenCalled()
  })

  it('renders children when provided', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateLearningElementTable
          selectedTopics={mockSelectedTopics}
          onLearningElementChange={jest.fn()}
          selectedLearningElements={mockSelectedLearningElements}
          selectAllLearningElementsChecked={false}
          setSelectAllLearningElementsChecked={mockSetSelectedAllLearningElementsChecked}>
          <div data-testid="child">Child Content</div>
        </CreateLearningElementTable>
      </MemoryRouter>
    )

    expect(getByTestId('child')).toBeInTheDocument()
  })
})
