import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
//Tests fail with shortened Path
import { useStore } from '../Zustand/Store'

const learningPathElement = { id: 1, name: 'Math', description: 'Learn math' }

describe('LearningPathElementSlice', () => {
  mockServices.fetchLearningPathElement.mockImplementation(() => Promise.resolve(learningPathElement))

  it('[HASKI-REQ-0059] should fetch learning path from server and cache it', async () => {
    const { getLearningPathElement } = useStore.getState()
    const courseId = '1'
    const topicId = '2'

    // Await the promise returned by getLearningPathElement
    const result = await getLearningPathElement(1, 2, 3, courseId, topicId)

    expect(result).toEqual(learningPathElement)
    expect(getLearningPathElement).toBeDefined()
    expect(getLearningPathElement).toBeInstanceOf(Function)
    expect(mockServices.fetchLearningPathElement).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningPathElement).toHaveBeenCalledWith(1, 2, 3, courseId, topicId)

    // Now check that the cache record is set with an object containing a "value" property.
    expect(useStore.getState()._cache_learningPathElement_record[`${courseId}-${topicId}`]).toEqual({
      value: learningPathElement
    })
  })

  it('[HASKI-REQ-0059] should return cached learning path if available', async () => {
    const { getLearningPathElement } = useStore.getState()
    const learningPath = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'
    const topicId = '2'

    await getLearningPathElement(1, 2, 3, courseId, topicId)

    expect(useStore.getState()._cache_learningPathElement_record[`${courseId}-${topicId}`]).toEqual({
      value: learningPath
    })

    const cached = await getLearningPathElement(1, 2, 3, courseId, topicId)

    expect(mockServices.fetchLearningPathElement).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(learningPath)
  })

  it('[HASKI-REQ-0059] should return cached learning path if available, clearLearningPathElementCache clears cached value', async () => {
    const { getLearningPathElement } = useStore.getState()
    const learningPath = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'
    const topicId = '2'

    await getLearningPathElement(1, 2, 3, courseId, topicId)

    expect(useStore.getState()._cache_learningPathElement_record[`${courseId}-${topicId}`]).toEqual({
      value: learningPath
    })

    const cached = await getLearningPathElement(1, 2, 3, courseId, topicId)

    expect(mockServices.fetchLearningPathElement).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(learningPath)
    const { clearLearningPathElementCache } = useStore.getState()
    clearLearningPathElementCache()
    await getLearningPathElement(1, 2, 3, courseId, topicId)
    expect(mockServices.fetchLearningPathElement).toHaveBeenCalledTimes(2)
  })
})
