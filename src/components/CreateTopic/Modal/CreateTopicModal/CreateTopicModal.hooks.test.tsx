import { act, renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { RemoteLearningElementWithClassification } from '@components'
import { RemoteTopics } from '@core'
import { useCreateTopicModal } from './CreateTopicModal.hooks'
import { SnackbarContext } from '@services'
import log from 'loglevel'

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

describe('useCreateTopicModal', () => {
  it('should initialize correctly with default functions available', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        selectedSolutions: {},
        selectedLearningElementSolution: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
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
        setSelectedLearningElementSolution: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn()
      })
    )
    expect(result.current).toHaveProperty('handleCreate')
    expect(result.current).toHaveProperty('handleTopicChange')
    expect(result.current).toHaveProperty('handleLearningElementChange')
    expect(result.current).toHaveProperty('handleLearningElementClassification')
    expect(result.current).toHaveProperty('handleAlgorithmChange')
  })

  it('handleCreate returns early when courseId is missing (no service calls)', async () => {
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
      })
    )

    await act(async () => {
      await result.current.handleCreate('Topic X', 1, {}, 'algoX', undefined)
    })

    expect(mockServices.postTopic).not.toHaveBeenCalled()
    expect(mockServices.postLearningElement).not.toHaveBeenCalled()
    expect(mockServices.postLearningPathAlgorithm).not.toHaveBeenCalled()
    expect(mockServices.postAddAllStudentsToTopics).not.toHaveBeenCalled()
    expect(mockServices.postCalculateLearningPathForAllStudents).not.toHaveBeenCalled()
  })

  it('handleTopicChange filters solutions and learningElementSolution maps', () => {
    const mockSetSelectedTopics = jest.fn()
    const mockSetSelectedLEs = jest.fn()
    const mockSetClassifications = jest.fn()
    const mockSetSolutions = jest.fn()
    const mockSetLEWithSolution = jest.fn()
    const mockSetAlgorithms = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedTopics: mockSetSelectedTopics,
        setSelectedLearningElements: mockSetSelectedLEs,
        setSelectedLearningElementsClassification: mockSetClassifications,
        setSelectedSolutions: mockSetSolutions,
        setSelectedLearningElementSolution: mockSetLEWithSolution,
        setSelectedAlgorithms: mockSetAlgorithms,
        selectedLearningElementSolution: {},
        selectedSolutions: {}
      })
    )

    const topics = [
      { topic_lms_id: 2, topic_lms_name: 'T2', lms_learning_elements: [] },
      { topic_lms_id: 1, topic_lms_name: 'T1', lms_learning_elements: [] }
    ]

    // Provide state-like objects containing extra keys we expect to be pruned
    const initialLEs = { 1: [], 2: [], 999: [] }
    const initialClass = { 1: [], 2: [], 999: [] }
    const initialAlgos = { 1: { a: 1 }, 999: { a: 2 } } as any
    const initialSolutions = { 1: [], 2: [], 999: [] }
    const initialLeSolutions = { 1: [], 2: [], 999: [] }

    ;(mockSetSelectedLEs as jest.Mock).mockImplementation((fn) => fn(initialLEs))
    ;(mockSetClassifications as jest.Mock).mockImplementation((fn) => fn(initialClass))
    ;(mockSetAlgorithms as jest.Mock).mockImplementation((fn) => fn(initialAlgos))
    ;(mockSetSolutions as jest.Mock).mockImplementation((fn) => fn(initialSolutions))
    ;(mockSetLEWithSolution as jest.Mock).mockImplementation((fn) => fn(initialLeSolutions))

    act(() => {
      result.current.handleTopicChange(topics as any)
    })

    // Sorted call (by topic_lms_id)
    expect(mockSetSelectedTopics).toHaveBeenCalledWith([
      { topic_lms_id: 1, topic_lms_name: 'T1', lms_learning_elements: [] },
      { topic_lms_id: 2, topic_lms_name: 'T2', lms_learning_elements: [] }
    ])

    // All four maps pruned to keys [1,2]
    expect(mockSetSelectedLEs).toHaveBeenCalled()
    expect(mockSetClassifications).toHaveBeenCalled()
    expect(mockSetAlgorithms).toHaveBeenCalled()
    expect(mockSetSolutions).toHaveBeenCalled()
    expect(mockSetLEWithSolution).toHaveBeenCalled()

    const prunedLEs = (mockSetSelectedLEs as jest.Mock).mock.results[0].value
    expect(Object.keys(prunedLEs).map(Number).sort()).toEqual([1, 2])
  })

  it('handleSolutionsChange and handleLearningElementSolutionChange call setters', () => {
    const mockSetSolutions = jest.fn()
    const mockSetLEWithSolution = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedSolutions: mockSetSolutions,
        setSelectedLearningElementSolution: mockSetLEWithSolution,
        selectedSolutions: {},
        selectedLearningElementSolution: {}
      })
    )

    const solutions = { 1: [{ id: 1 } as any] }
    const leSolutions = { 2: [{ learningElementLmsId: 10, solutionLmsId: 20 } as any] }

    act(() => result.current.handleSolutionsChange(solutions))
    act(() => result.current.handleLearningElementSolutionChange(leSolutions))

    expect(mockSetSolutions).toHaveBeenCalledWith(solutions)
    expect(mockSetLEWithSolution).toHaveBeenCalledWith(leSolutions)
  })

  it('handleCreateLearningElementsInExistingTopic success with no solutions clears caches & shows success', async () => {
    mockServices.fetchUser.mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    // LE creation & calc path
    mockServices.postLearningElement.mockResolvedValue({})
    mockServices.postCalculateLearningPathForAllStudents.mockResolvedValue({})

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        selectedLearningElementSolution: { 1: [] }, // no solutions
        selectedSolutions: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
      })
    )

    await act(async () => {
      await result.current.handleCreateLearningElementsInExistingTopic(
        1,
        {
          1: [
            {
              lms_id: 10,
              lms_learning_element_name: 'A',
              lms_activity_type: 'video',
              classification: 'X',
              disabled: false
            },
            {
              lms_id: 11,
              lms_learning_element_name: 'B',
              lms_activity_type: 'video',
              classification: 'Y',
              disabled: true
            } // filtered out
          ] as any
        },
        '123',
        'COURSE'
      )
    })

    // created only one LE (disabled filtered)
    expect(mockServices.postLearningElement).toHaveBeenCalledTimes(1)
    expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalledTimes(1)
  })

  it('covers catch in solutions Promise.all (existing topic): shows snackbar and logs error', async () => {
    // Arrange: user + previous API steps succeed
    mockServices.fetchUser.mockResolvedValue({
      name: 'U',
      university: 'Uni',
      role: 'course creator',
      lms_user_id: 11,
      settings: { user_id: 99 }
    })
    mockServices.postLearningElement.mockResolvedValue({})
    mockServices.postCalculateLearningPathForAllStudents.mockResolvedValue({})

    // 2 solution calls: first ok, second rejects → hit the `.catch(...)` inside the map
    mockServices.postLearningElementSolution.mockRejectedValueOnce(() => {
      new Error('postLearningElementSolution error')
    })

    const addSnackbarMock = jest.fn()

    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }
    const logSpy = jest.spyOn(log, 'error').mockImplementation(() => {})

    // Provide SnackbarContext
    const wrapper = ({ children }: any) => (
      <SnackbarContext.Provider value={my_context}>{children}</SnackbarContext.Provider>
    )

    const topicLmsId = 42
    const selectedLearningElementSolution = {
      [topicLmsId]: [
        // one with default type fallback (covers `?? 'resource'`)
        { learningElementLmsId: 10, solutionLmsId: 20, solutionLmsType: undefined, learningElementName: 'solution-1' },
        // one that will fail
        { learningElementLmsId: 11, solutionLmsId: 21, solutionLmsType: 'h5p', learningElementName: 'solution-2' }
      ]
    }

    const { result } = renderHook(
      () =>
        useCreateTopicModal({
          setSelectedLearningElements: jest.fn(),
          setSelectedLearningElementsClassification: jest.fn(),
          setSelectedLearningElementSolution: jest.fn(),
          setSelectedSolutions: jest.fn(),
          selectedSolutions: {},
          selectedLearningElementSolution
        }),
      { wrapper }
    )

    // Act: call with matching topicId+courseId so we go into the solutions branch
    await act(async () => {
      await result.current.handleCreateLearningElementsInExistingTopic(
        topicLmsId,
        {
          [topicLmsId]: [
            {
              lms_id: 1001,
              lms_learning_element_name: 'LE',
              lms_activity_type: 'video',
              classification: 'X',
              disabled: false
            }
          ] as any
        },
        '777', // topicId
        'COURSE' // courseId
      )
    })

    // Assert: two calls, one failed
    expect(mockServices.postLearningElementSolution).toHaveBeenCalledTimes(1)
    // Snackbar shown for failing solution (contains id)
    expect(addSnackbarMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        message: 'error.postLearningElementSolution',
        severity: 'error',
        autoHideDuration: 5000
      })
    )

    expect(addSnackbarMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        message: 'error.postCalculateLearningPathForAllStudents',
        severity: 'error',
        autoHideDuration: 5000
      })
    )
    // log.error called with the same error path
    expect(logSpy).toHaveBeenCalled()
  })

  it('should add snackbar on error in handleCreate, when postLearningElement fails', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1', topicId: '3' })
    mockServices.postLearningElement.mockRejectedValueOnce(() => {
      new Error('postLearningElement error')
    })

    const addSnackbarMock = jest.fn()

    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    // Provide SnackbarContext
    const wrapper = ({ children }: any) => (
      <SnackbarContext.Provider value={my_context}>{children}</SnackbarContext.Provider>
    )

    const selectedLearningElementsClassification = {
      3: [
        {
          lms_id: 201,
          classification: 'EK',
          lms_learning_element_name: 'Element 3',
          lms_activity_type: 'Activity',
          disabled: false
        }
      ]
    }

    const mockSetCreateTopicIsSending = jest.fn()
    const { result } = renderHook(
      () =>
        useCreateTopicModal({
          setCreateTopicIsSending: mockSetCreateTopicIsSending,
          setSuccessfullyCreatedTopicsCount: jest.fn(),
          setSelectedTopics: jest.fn(),
          setSelectedLearningElements: jest.fn(),
          setSelectedLearningElementsClassification: jest.fn(),
          setSelectedLearningElementSolution: jest.fn(),
          setSelectedAlgorithms: jest.fn(),
          selectedLearningElementSolution: {},
          selectedSolutions: {},
          setSelectedSolutions: jest.fn()
        }),
      { wrapper }
    )

    await act(async () => {
      await result.current.handleCreate('Topic A', 1, selectedLearningElementsClassification, 'ALG', '1')
    })

    expect(addSnackbarMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        message: 'error.postLearningElement Element 3',
        severity: 'error',
        autoHideDuration: 5000
      })
    )

    expect(addSnackbarMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        message: 'error.postCalculateLearningPathForAllStudents',
        severity: 'error',
        autoHideDuration: 5000
      })
    )
  })

  it('handleCreateLearningElementsInExistingTopic — solution creation error triggers snackbar and logs', async () => {
    mockServices.fetchUser.mockResolvedValue({
      name: 'U',
      university: 'Uni',
      role: 'teacher',
      lms_user_id: 11,
      settings: { user_id: 99 }
    })

    mockServices.postLearningElement.mockResolvedValue({})
    mockServices.postCalculateLearningPathForAllStudents.mockResolvedValue({})
    mockServices.postLearningElementSolution
      .mockResolvedValueOnce({}) // first solution ok
      .mockRejectedValueOnce(new Error('boom')) // second fails

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        selectedLearningElementSolution: {
          1: [
            // two solutions, second will fail; also test defaulting to 'resource'
            { learningElementLmsId: 10, solutionLmsId: 20, solutionLmsType: undefined } as any,
            { learningElementLmsId: 11, solutionLmsId: 21, solutionLmsType: 'h5p' } as any
          ]
        },
        selectedSolutions: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
      })
    )

    await act(async () => {
      await result.current.handleCreateLearningElementsInExistingTopic(
        1,
        {
          1: [
            {
              lms_id: 10,
              lms_learning_element_name: 'A',
              lms_activity_type: 'video',
              classification: 'X',
              disabled: false
            }
          ] as any
        },
        '123',
        'COURSE'
      )
    })

    expect(mockServices.postLearningElementSolution).toHaveBeenCalledTimes(1)
  })

  it('handleCreate happy path creates topic, LEs, algorithms (+continues on algo error), adds students, calculates, creates solutions, increments counter', async () => {
    mockServices.fetchUser.mockResolvedValue({
      name: 'U',
      university: 'Uni',
      role: 'teacher',
      lms_user_id: 11,
      settings: { user_id: 99 }
    })

    mockServices.postTopic.mockResolvedValue({ id: 777, lms_id: 222 })
    mockServices.postLearningElement.mockResolvedValue({})
    mockServices.postLearningPathAlgorithm.mockRejectedValueOnce(new Error('algo failed')) // cover catch branch
    mockServices.postAddAllStudentsToTopics.mockResolvedValue({})
    mockServices.postCalculateLearningPathForAllStudents.mockResolvedValue({})
    mockServices.postLearningElementSolution
      .mockResolvedValueOnce({}) // first ok
      .mockRejectedValueOnce(new Error('sol failed')) // second triggers handleError

    const mockSetCount = jest.fn()
    const { result } = renderHook(() =>
      useCreateTopicModal({
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn(),
        selectedSolutions: {},
        selectedLearningElementSolution: {
          222: [
            { learningElementLmsId: 10, solutionLmsId: 20, solutionLmsType: undefined } as any, // default to 'resource'
            { learningElementLmsId: 11, solutionLmsId: 21, solutionLmsType: 'h5p' } as any
          ]
        },
        setSuccessfullyCreatedTopicsCount: mockSetCount
      })
    )

    const classification = {
      222: [
        {
          lms_id: 10,
          lms_learning_element_name: 'LE-A',
          lms_activity_type: 'video',
          classification: 'X',
          disabled: false
        },
        {
          lms_id: 11,
          lms_learning_element_name: 'LE-B',
          lms_activity_type: 'quiz',
          classification: 'Y',
          disabled: false
        }
      ]
    }

    await act(async () => {
      await result.current.handleCreate('Topic A', 123, classification as any, 'ALG', 'COURSE')
    })

    expect(mockServices.postTopic).toHaveBeenCalled()
    expect(mockServices.postLearningElement).toHaveBeenCalledTimes(2)
    expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalled()
    expect(mockServices.postLearningElementSolution).toHaveBeenCalledTimes(1)

    // counter incremented on success path
    expect(mockSetCount).toHaveBeenCalled()
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
        setSelectedLearningElementSolution: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn()
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
        setSelectedLearningElementSolution: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn()
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
        setSelectedLearningElementSolution: jest.fn(),
        setSelectedAlgorithms: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn()
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
        setSelectedLearningElementSolution: jest.fn(),
        setSelectedAlgorithms: mockSetSelectedAlgorithms,
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn()
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
        setSuccessfullyCreatedTopicsCount: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
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
        setSuccessfullyCreatedTopicsCount: jest.fn(),
        selectedLearningElementSolution: {},
        selectedSolutions: {},
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn()
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

  it('handleCreate outer catch sets sending=false when getUser fails', async () => {
    mockServices.fetchUser.mockRejectedValueOnce(new Error('nope'))
    const mockSetSending = jest.fn()

    const { result } = renderHook(() =>
      useCreateTopicModal({
        setCreateTopicIsSending: mockSetSending,
        setSelectedLearningElements: jest.fn(),
        setSelectedLearningElementsClassification: jest.fn(),
        setSelectedSolutions: jest.fn(),
        setSelectedLearningElementSolution: jest.fn(),
        selectedSolutions: {},
        selectedLearningElementSolution: {}
      })
    )

    await act(async () => {
      await result.current.handleCreate('Topic A', 1, {}, 'ALG', 'COURSE')
    })

    expect(mockSetSending).toHaveBeenCalledWith(false)
  })
})
