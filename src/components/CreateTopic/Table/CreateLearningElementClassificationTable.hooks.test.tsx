import { act, renderHook } from '@testing-library/react-hooks'
import { LearningElementWithClassification } from '@components'
import { useCreateLearningElementClassificationTable } from './CreateLearningElementClassificationTable.hooks'

describe('useCreateLearningElementClassificationTable', () => {
  const initialLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'noKey' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }
    ]
  }

  const updatedLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'KÜ' }, // Updated classification
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }
    ]
  }

  it('updates classification for the specified learning element', () => {
    const mockOnLearningElementChange = jest.fn()

    const { result } = renderHook(() =>
      useCreateLearningElementClassificationTable({
        LearningElementsClassification: initialLearningElementsClassification,
        onLearningElementChange: mockOnLearningElementChange
      })
    )

    // Update classification of learning element with ID 101 in topic ID 1 to 'KÜ'
    act(() => {
      result.current.handleClassificationChange(1, 101, 'KÜ')
    })

    expect(mockOnLearningElementChange).toHaveBeenCalledWith(updatedLearningElementsClassification)
  })

  it('memoizes handleClassificationChange function', () => {
    const mockOnLearningElementChange = jest.fn()

    const { result, rerender } = renderHook(() =>
      useCreateLearningElementClassificationTable({
        LearningElementsClassification: initialLearningElementsClassification,
        onLearningElementChange: mockOnLearningElementChange
      })
    )

    const initialHandleClassificationChange = result.current.handleClassificationChange
    rerender()

    // Verify the function is memoized and remains the same between renders
    expect(result.current.handleClassificationChange).toBe(initialHandleClassificationChange)
  })
})
