import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react-hooks'
import { RemoteTopics } from '@core'
import { useCreateRemoteTopicsTable } from './CreateRemoteTopicsTable.hooks'

describe('[HASKI-REQ-0036] useCreateRemoteTopicsTable', () => {
  const mockOnTopicChange = jest.fn()

  const mockSelectedTopics: RemoteTopics[] = [
    {
      topic_lms_id: 1,
      topic_lms_name: 'Topic 1',
      lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
    }
  ]

  const newTopic: RemoteTopics = {
    topic_lms_id: 2,
    topic_lms_name: 'Topic 2',
    lms_learning_elements: [{ lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('adds a topic when checked is true', () => {
    const { result } = renderHook(() =>
      useCreateRemoteTopicsTable({
        onTopicChange: mockOnTopicChange,
        selectedTopics: mockSelectedTopics
      })
    )

    act(() => {
      result.current.handleTopicChange(newTopic, true)
    })

    expect(mockOnTopicChange).toHaveBeenCalledWith([...mockSelectedTopics, newTopic])
  })

  it('removes a topic when checked is false', () => {
    const { result } = renderHook(() =>
      useCreateRemoteTopicsTable({
        onTopicChange: mockOnTopicChange,
        selectedTopics: [...mockSelectedTopics, newTopic] // Initially, both topics are selected
      })
    )

    act(() => {
      result.current.handleTopicChange(newTopic, false)
    })

    expect(mockOnTopicChange).toHaveBeenCalledWith(mockSelectedTopics) // Only the initial topic should remain
  })

  it('does not change handleTopicChange reference if dependencies do not change', () => {
    const { result, rerender } = renderHook((props) => useCreateRemoteTopicsTable(props), {
      initialProps: {
        onTopicChange: mockOnTopicChange,
        selectedTopics: mockSelectedTopics
      }
    })

    const initialHandleTopicChange = result.current.handleTopicChange

    // Re-render with the same props
    rerender({
      onTopicChange: mockOnTopicChange,
      selectedTopics: mockSelectedTopics
    })

    expect(result.current.handleTopicChange).toBe(initialHandleTopicChange) // The reference should not change
  })

  it('changes handleTopicChange reference if selectedTopics changes', () => {
    const { result, rerender } = renderHook((props) => useCreateRemoteTopicsTable(props), {
      initialProps: {
        onTopicChange: mockOnTopicChange,
        selectedTopics: mockSelectedTopics
      }
    })

    const initialHandleTopicChange = result.current.handleTopicChange

    // Re-render with updated selectedTopics
    rerender({
      onTopicChange: mockOnTopicChange,
      selectedTopics: [...mockSelectedTopics, newTopic] // Change in selectedTopics
    })

    expect(result.current.handleTopicChange).not.toBe(initialHandleTopicChange) // The reference should change
  })
})
