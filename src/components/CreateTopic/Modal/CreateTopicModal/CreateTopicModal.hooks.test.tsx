import { act, renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { RemoteLearningElementWithClassification } from '@components'
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

const mockRemoteLearningElementWithClassification: { [key: number]: RemoteLearningElementWithClassification[] } = {
  1: [
    {
      lms_id: 101,
      lms_learning_element_name: 'Introduction to AI',
      lms_activity_type: 'video',
      classification: 'BEGINNER'
    },
    {
      lms_id: 102,
      lms_learning_element_name: 'AI Ethics',
      lms_activity_type: 'article',
      classification: 'INTERMEDIATE'
    }
  ],
  2: [
    {
      lms_id: 201,
      lms_learning_element_name: 'Deep Learning Basics',
      lms_activity_type: 'quiz',
      classification: 'ADVANCED'
    },
    {
      lms_id: 202,
      lms_learning_element_name: 'Neural Networks in Practice',
      lms_activity_type: 'h5pactivity',
      classification: 'EXPERT'
    }
  ],
  3: [
    {
      lms_id: 301,
      lms_learning_element_name: 'Deep Learning Advanced',
      lms_activity_type: 'quiz',
      classification: 'ADVANCED'
    },
    {
      lms_id: 302,
      lms_learning_element_name: 'Neural Networks in Theory',
      lms_activity_type: 'h5pactivity',
      classification: 'EXPERT'
    }
  ]
}

describe('[HASKI-REQ-0036] useCreateTopicModal', () => {
  it('should initialize correctly with default functions available', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn()
      })
    )

    act(() => {
      result.current.handleTopicChange(mockRemoteTopics)
    })

    act(() => {
      result.current.handleLearningElementChange({ 1: [mockLearningElement] })
    })

    act(() => {
      result.current.handleAlgorithmChange({})
    })

    await act(async () => {
      await result.current.handleCreate('Topic 1', 1, mockRemoteLearningElementWithClassification, 'algo1', '1')
    })
  })

  it('should initialize correctly with all functions available', () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn(),
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    const mockSetSelectedTopics = jest.fn()
    const mockSetSelectedLearningElements = jest.fn()
    const mockSetSelectedLearningElementsClassification = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn(),
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    const mockSetSelectedLearningElements = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn(),
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const mockSetSelectedLearningElementsClassification = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn(),
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
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const mockSetSelectedAlgorithms = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn(),
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

  it('handleCreateLearningElementsInExistingTopic is returned without courseId or topicId', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const mockSetCreateTopicIsSending = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: mockSetCreateTopicIsSending,
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn()
      })
    )

    await act(async () => {
      await result.current.handleCreateLearningElementsInExistingTopic(1, mockRemoteLearningElementWithClassification)
    })
  })

  it('handleCreateLearningElementsInExistingTopic is working as intended', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const mockSetCreateTopicIsSending = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: mockSetCreateTopicIsSending,
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn()
      })
    )

    await act(async () => {
      await result.current.handleCreateLearningElementsInExistingTopic(
        1,
        mockRemoteLearningElementWithClassification,
        '2',
        '1'
      )
    })
  })

  it('should add snackbar on error in handleCreate', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const mockSetCreateTopicIsSending = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: mockSetCreateTopicIsSending,
        setSelectedTopics: jest.fn(),
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        setSuccessfullyCreatedTopicsCount: jest.fn()
      })
    )
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    await act(async () => {
      await result.current.handleCreate('Topic 1', 1, {}, 'algo1', '1')
    })
  })
})
