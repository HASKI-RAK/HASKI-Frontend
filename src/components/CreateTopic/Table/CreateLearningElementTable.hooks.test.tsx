import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { act } from 'react-test-renderer'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { useCreateLearningElementTable } from './CreateLearningElementTable.hooks'

describe('CreateLearningElementTable.hooks', () => {
  const mockOnLearningElementChange = jest.fn()
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

  it('adds a learning element when checkbox is checked', () => {
    const { result } = renderHook(() =>
      useCreateLearningElementTable({
        selectedLearningElements: mockSelectedLearningElements,
        onLearningElementChange: mockOnLearningElementChange,
        selectedTopics: mockSelectedTopics,
        setSelectAllLearningElementsChecked: mockSetSelectedAllLearningElementsChecked
      })
    )

    const newElement: RemoteLearningElement = {
      lms_id: 102,
      lms_learning_element_name: 'Element 2',
      lms_activity_type: 'Activity'
    }

    act(() => {
      result.current.handleLearningElementCheckboxChange(1, newElement, true)
    })

    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      ...mockSelectedLearningElements,
      1: [...mockSelectedLearningElements[1], newElement]
    })
  })

  it('removes a learning element when checkbox is unchecked', () => {
    const { result } = renderHook(() =>
      useCreateLearningElementTable({
        selectedLearningElements: mockSelectedLearningElements,
        onLearningElementChange: mockOnLearningElementChange,
        selectedTopics: mockSelectedTopics,
        setSelectAllLearningElementsChecked: mockSetSelectedAllLearningElementsChecked
      })
    )

    const existingElement: RemoteLearningElement = {
      lms_id: 101,
      lms_learning_element_name: 'Element 1',
      lms_activity_type: 'Activity'
    }

    act(() => {
      result.current.handleLearningElementCheckboxChange(1, existingElement, false)
    })

    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      ...mockSelectedLearningElements,
      1: [] // Element 1 removed
    })
  })

  it('selects all learning elements when handleSelectAllLearningElements is called', () => {
    const { result } = renderHook(() =>
      useCreateLearningElementTable({
        selectedLearningElements: mockSelectedLearningElements,
        onLearningElementChange: mockOnLearningElementChange,
        selectedTopics: mockSelectedTopics,
        setSelectAllLearningElementsChecked: mockSetSelectedAllLearningElementsChecked
      })
    )

    act(() => {
      result.current.handleToggleAll(true)
    })

    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      1: mockSelectedTopics[0].lms_learning_elements,
      2: mockSelectedTopics[1].lms_learning_elements
    })
  })

  it('deselects all learning elements when handleDeselectAllLearningElements is called', () => {
    const { result } = renderHook(() =>
      useCreateLearningElementTable({
        selectedLearningElements: mockSelectedLearningElements,
        onLearningElementChange: mockOnLearningElementChange,
        selectedTopics: mockSelectedTopics,
        setSelectAllLearningElementsChecked: mockSetSelectedAllLearningElementsChecked
      })
    )

    act(() => {
      result.current.handleToggleAll(false)
    })

    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      1: [],
      2: []
    })
  })
})
