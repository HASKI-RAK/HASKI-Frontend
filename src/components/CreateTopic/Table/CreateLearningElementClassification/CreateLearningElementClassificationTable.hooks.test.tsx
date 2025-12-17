import { act, renderHook } from '@testing-library/react-hooks'
import { LearningElementWithClassification } from '@components'
import { useCreateLearningElementClassificationTable } from './CreateLearningElementClassificationTable.hooks'

describe('[HASKI-REQ-0037] useCreateLearningElementClassificationTable', () => {
  const initialLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: '' },
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
        onLearningElementChange: mockOnLearningElementChange,
        selectedSolutions: {},
        onSolutionChange: jest.fn
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
        onLearningElementChange: mockOnLearningElementChange,
        selectedSolutions: {},
        onSolutionChange: jest.fn
      })
    )

    const initialHandleClassificationChange = result.current.handleClassificationChange
    rerender()

    // Verify the function is memoized and remains the same between renders
    expect(result.current.handleClassificationChange).toBe(initialHandleClassificationChange)
  })

  it('disables and enables classification input and adds and removes solution', () => {
    const mockOnSolutionChange = jest.fn()
    const mockOnLearningElementChange = jest.fn()

    const mockLearningElementsClassification = {
      1: [
        {
          lms_id: 101,
          lms_learning_element_name: 'Element 1',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: false
        },
        {
          lms_id: 102,
          lms_learning_element_name: 'Element 2',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: false
        }
      ]
    }

    const { result } = renderHook(() =>
      useCreateLearningElementClassificationTable({
        LearningElementsClassification: mockLearningElementsClassification,
        onLearningElementChange: mockOnLearningElementChange,
        selectedSolutions: {},
        onSolutionChange: mockOnSolutionChange
      })
    )

    // Add solution and disable input
    act(() => {
      result.current.handleSolutionchange(1, 101, 'Element 1', true, 'Activity')
    })

    expect(mockOnSolutionChange).toHaveBeenCalledWith({
      1: [{ solutionLmsId: 101, solutionLmsName: 'Element 1', solutionLmsType: 'Activity' }]
    })
    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      1: [
        {
          lms_id: 101,
          lms_learning_element_name: 'Element 1',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: true
        },
        {
          lms_id: 102,
          lms_learning_element_name: 'Element 2',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: false
        }
      ]
    })

    // Remove solution and enable input
    act(() => {
      result.current.handleSolutionchange(1, 101, 'Element 1', false, 'Activity')
    })

    expect(mockOnSolutionChange).toHaveBeenCalledWith({
      1: []
    })
    expect(mockOnLearningElementChange).toHaveBeenCalledWith({
      1: [
        {
          lms_id: 101,
          lms_learning_element_name: 'Element 1',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: false
        },
        {
          lms_id: 102,
          lms_learning_element_name: 'Element 2',
          lms_activity_type: 'Activity',
          classification: '',
          disabled: false
        }
      ]
    })
  })
})
