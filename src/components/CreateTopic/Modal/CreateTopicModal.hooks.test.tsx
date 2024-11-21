import { act, renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import { RemoteTopics } from '@core'
import { useCreateTopicModal } from './CreateTopicModal.hooks'

const mockLearningElement = {
  lms_id: 101,
  lms_learning_element_name: 'Element 1',
  lms_activity_type: 'Activity'
}

const mockRemoteTopics: RemoteTopics[] = [
  {
    topic_lms_id: 1,
    topic_lms_name: 'Sample Topic 1',
    lms_learning_elements: [mockLearningElement]
  },
  {
    topic_lms_id: 2,
    topic_lms_name: 'Sample Topic 2',
    lms_learning_elements: [mockLearningElement]
  }
]

describe('useCreateTopicModal', () => {
  it('should initialize correctly with all functions available', () => {
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn()
      })
    )
    expect(result.current).toHaveProperty('handleCreate')
    expect(result.current).toHaveProperty('handleTopicChange')
    expect(result.current).toHaveProperty('handleLearningElementChange')
    expect(result.current).toHaveProperty('handleLearningElementClassification')
    expect(result.current).toHaveProperty('handleAlgorithmChange')
  })

  it('should call setSelectedTopics and filter elements correctly in handleTopicChange', () => {
    const mockSetSelectedTopics = jest.fn()
    const mockSetSelectedLearningElements = jest.fn()
    const mockSetSelectedLearningElementsClassification = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: mockSetSelectedTopics,
        setSelectedLearningElements: mockSetSelectedLearningElements,
        setSelectedLearningElementsClassification: mockSetSelectedLearningElementsClassification,
        setSelectedAlgorithms: jest.fn()
      })
    )

    act(() => {
      result.current.handleTopicChange(mockRemoteTopics)
    })

    expect(mockSetSelectedTopics).toHaveBeenCalledWith(mockRemoteTopics)
    expect(mockSetSelectedLearningElements).toHaveBeenCalled()
    expect(mockSetSelectedLearningElementsClassification).toHaveBeenCalled()
  })

  it('should update learning elements on handleLearningElementChange', () => {
    const mockSetSelectedLearningElements = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: mockSetSelectedLearningElements,
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn()
      })
    )
    const learningElements = {
      1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
    }
    act(() => {
      result.current.handleLearningElementChange(learningElements)
    })
    expect(mockSetSelectedLearningElements).toHaveBeenCalledWith(learningElements)
  })

  it('should update learning element classifications on handleLearningElementClassification', () => {
    const mockSetSelectedLearningElementsClassification = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: mockSetSelectedLearningElementsClassification,
        setSelectedAlgorithms: jest.fn()
      })
    )
    const learningElementClassifications = {
      1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'KÜ' }]
    }
    act(() => {
      result.current.handleLearningElementClassification(learningElementClassifications)
    })
    expect(mockSetSelectedLearningElementsClassification).toHaveBeenCalledWith(learningElementClassifications)
  })

  it('should update algorithms on handleAlgorithmChange', () => {
    const mockSetSelectedAlgorithms = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: mockSetSelectedAlgorithms
      })
    )
    const algorithms = { 1: { topicName: 'Topic 1', algorithmShortName: 'algo1' } }
    act(() => {
      result.current.handleAlgorithmChange(algorithms)
    })
    expect(mockSetSelectedAlgorithms).toHaveBeenCalledWith(algorithms)
  })

  it('should add snackbar on error in handleCreate', async () => {
    const mockSetCreateTopicIsSending = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: mockSetCreateTopicIsSending,
        setSuccessTopicCreated: jest.fn(),
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn()
      })
    )
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    await act(async () => {
      await result.current.handleCreate('Topic 1', 1, {}, 'algo1', '1')
    })

    expect(mockSetCreateTopicIsSending).toHaveBeenCalledWith(false)
  })
})
