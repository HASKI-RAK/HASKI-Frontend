import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

describe('LearningElementSolutionSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch learning element solution from server and cache them', async () => {
    const { getLearningElementSolution } = useStore.getState()
    const learningElementSolution = {
      id: 1,
      learning_element_lms_id: 1,
      solution_lms_id: 4,
      activity_type: 'activity'
    }

    const learningElementId = 1

    const result = await getLearningElementSolution(learningElementId)

    expect(result).toEqual(learningElementSolution)
    expect(getLearningElementSolution).toBeDefined()
    expect(getLearningElementSolution).toBeInstanceOf(Function)
    expect(mockServices.fetchLearningElementSolution).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningElementSolution).toHaveBeenCalledWith(1)
    expect(useStore.getState()._learningElementSolution[`${learningElementId}`]).toEqual(learningElementSolution)
    expect(getLearningElementSolution).not.toThrow() // counts as function call (getLearningElementSolution), here it would be Called 2 times instead of 1
  })

  it('should return cached learning element solution if available', async () => {
    const { getLearningElementSolution } = useStore.getState()
    const learningElementSolution = { id: 1, learning_element_lms_id: 1, solution_lms_id: 4, activity_type: 'activity' }

    const learningElementId = 1

    await getLearningElementSolution(learningElementId)
    expect(useStore.getState()._learningElementSolution[`${learningElementId}`]).toEqual(learningElementSolution)

    const result = await getLearningElementSolution(learningElementId)
    expect(result).toEqual(learningElementSolution)
    expect(mockServices.fetchLearningElementSolution).toHaveBeenCalledTimes(1)
  })

  it('should manually set a learning element solution', () => {
    const { setLearningElementSolution } = useStore.getState()
    const learningElementLmsId = 2
    const solutionLmsId = 5
    const activityType = 'video'

    setLearningElementSolution(learningElementLmsId, solutionLmsId, activityType)

    const expected = {
      learning_element_lms_id: learningElementLmsId,
      solution_lms_id: solutionLmsId,
      activity_type: activityType
    }

    expect(useStore.getState()._learningElementSolution[`${learningElementLmsId}`]).toEqual(expected)
  })

  it('should manually set a learning element solution, when no activityType is given', () => {
    const { setLearningElementSolution } = useStore.getState()
    const learningElementLmsId = 2
    const solutionLmsId = 5

    setLearningElementSolution(learningElementLmsId, solutionLmsId)

    const expected = {
      learning_element_lms_id: learningElementLmsId,
      solution_lms_id: solutionLmsId,
      activity_type: 'resource'
    }

    expect(useStore.getState()._learningElementSolution[`${learningElementLmsId}`]).toEqual(expected)
  })
})
