import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
//Tests fail with shortened Path
import { useStore } from '../Zustand/Store'

const learningPathElementSolution = [
  { id: 1, learning_element_lms_id: '1', activity_type: 'h5pactivity', solution_lms_id: '2' },
  { id: 2, learning_element_lms_id: '3', activity_type: 'h5pactivity', solution_lms_id: '4' }
]

describe('LearningPathElementSolutionSlice', () => {
  mockServices.fetchLearningPathElementSolution.mockImplementation(() => Promise.resolve(learningPathElementSolution))

  it('should fetch learning path element solutions from server and cache it', async () => {
    const { getLearningPathElementSolution } = useStore.getState()
    const topicId = '1'

    // Await the promise returned by getLearningPathElement
    const result = await getLearningPathElementSolution(topicId)

    expect(result).toEqual(learningPathElementSolution)
    expect(getLearningPathElementSolution).toBeDefined()
    expect(getLearningPathElementSolution).toBeInstanceOf(Function)
    expect(mockServices.fetchLearningPathElementSolution).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningPathElementSolution).toHaveBeenCalledWith(topicId)

    // Now check that the cache record is set with an object containing a "value" property.
    expect(useStore.getState()._cache_learningPathElementSolution_record[`${topicId}`]).toEqual({
      value: learningPathElementSolution
    })
  })

  it('should return cached learning path element solutions if available', async () => {
    const { getLearningPathElementSolution } = useStore.getState()
    const learningPathElementSolution = [
      { id: 1, learning_element_lms_id: '1', activity_type: 'h5pactivity', solution_lms_id: '2' },
      { id: 2, learning_element_lms_id: '3', activity_type: 'h5pactivity', solution_lms_id: '4' }
    ]

    const topicId = '1'

    await getLearningPathElementSolution(topicId)

    expect(useStore.getState()._cache_learningPathElementSolution_record[`${topicId}`]).toEqual({
      value: learningPathElementSolution
    })

    const cached = await getLearningPathElementSolution(topicId)

    expect(mockServices.fetchLearningPathElementSolution).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(learningPathElementSolution)
  })

  it('should return cached learning path element solutions if available, clearLearningPathElementSolutionCache clears cached value', async () => {
    const { getLearningPathElementSolution } = useStore.getState()
    const learningPathElementSolution = [
      { id: 1, learning_element_lms_id: '1', activity_type: 'h5pactivity', solution_lms_id: '2' },
      { id: 2, learning_element_lms_id: '3', activity_type: 'h5pactivity', solution_lms_id: '4' }
    ]
    const topicId = '2'

    await getLearningPathElementSolution(topicId)

    expect(useStore.getState()._cache_learningPathElementSolution_record[`${topicId}`]).toEqual({
      value: learningPathElementSolution
    })

    const cached = await getLearningPathElementSolution(topicId)

    expect(mockServices.fetchLearningPathElementSolution).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(learningPathElementSolution)
    const { clearLearningPathElementSolutionCache } = useStore.getState()
    clearLearningPathElementSolutionCache()
    await getLearningPathElementSolution(topicId)
    expect(mockServices.fetchLearningPathElementSolution).toHaveBeenCalledTimes(2)
  })
})
