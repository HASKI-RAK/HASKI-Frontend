import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const learningPathElement = { id: 1, name: 'Math', description: 'Learn math' }

describe('LearningPathElementSlice', () => {
  mockServices.getLearningPathElement.mockReturnValue(learningPathElement)

  it('should fetch learning path from server and cache it', async () => {
    const { fetchLearningPathElement } = useStore.getState()
    const courseId = '1'
    const topicId = '2'

    const result = await fetchLearningPathElement(1, 2, 3, courseId, topicId)

    expect(result).toEqual(learningPathElement)
    expect(fetchLearningPathElement).toBeDefined()
    expect(fetchLearningPathElement).toBeInstanceOf(Function)
    expect(mockServices.getLearningPathElement).toHaveBeenCalledTimes(1)
    expect(mockServices.getLearningPathElement).toHaveBeenCalledWith(1, 2, 3, courseId, topicId)
    expect(useStore.getState()._cache_learningPathElement_record[`${courseId}-${topicId}`]).toEqual(learningPathElement)
  })

  it('should return cached learning path if available', async () => {
    const { fetchLearningPathElement } = useStore.getState()
    const learningPath = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'
    const topicId = '2'

    await fetchLearningPathElement(1, 2, 3, courseId, topicId)

    expect(useStore.getState()._cache_learningPathElement_record[`${courseId}-${topicId}`]).toEqual(learningPath)

    const cached = await fetchLearningPathElement(1, 2, 3, courseId, topicId)

    expect(mockServices.getLearningPathElement).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(learningPath)
  })
})
