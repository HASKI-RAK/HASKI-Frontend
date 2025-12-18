import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
// tests not working when shortened
import { useStore } from '../Zustand/Store'

const learningPathTopic = { id: 1, name: 'Math', description: 'Learn math' }
describe('LearningPathTopicSlice ', () => {
  mockServices.fetchLearningPathTopic.mockResolvedValue(learningPathTopic)

  it('[HASKI-REQ-0085] should fetch learning path from server and cache it', async () => {
    const { getLearningPathTopic } = useStore.getState()
    const courseId = '2'

    const result = await getLearningPathTopic(1, 2, 3, courseId)

    expect(result).toEqual(learningPathTopic)
    expect(getLearningPathTopic).toBeDefined()
    expect(mockServices.fetchLearningPathTopic).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningPathTopic).toHaveBeenCalledWith(1, 2, 3, courseId)
    expect(useStore.getState()._cache_learningPathTopic_record[`${courseId}`]).toEqual({
      value: { id: 1, name: 'Math', description: 'Learn math' }
    })
  })

  it('[HASKI-REQ-0085] should return cached learning path if available', async () => {
    const { getLearningPathTopic } = useStore.getState()
    const learningPathTopic = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'

    await getLearningPathTopic(1, 2, 3, courseId)

    expect(useStore.getState()._cache_learningPathTopic_record[`${courseId}`]).toEqual({
      value: { id: 1, name: 'Math', description: 'Learn math' }
    })

    const cached = await getLearningPathTopic(1, 2, 3, courseId)

    expect(mockServices.fetchLearningPathTopic).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(learningPathTopic)
  })

  it('[HASKI-REQ-0085] should trigger a reload even if cache is available', async () => {
    const { getLearningPathTopic } = useStore.getState()
    const learningPathTopic = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'

    await getLearningPathTopic(1, 2, 3, courseId)

    expect(useStore.getState()._cache_learningPathTopic_record[`${courseId}`]).toEqual({
      value: { id: 1, name: 'Math', description: 'Learn math' }
    })

    const cached = await getLearningPathTopic(1, 2, 3, courseId)

    expect(mockServices.fetchLearningPathTopic).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(learningPathTopic)

    const { clearLearningPathTopicCache } = useStore.getState()
    clearLearningPathTopicCache()
    await getLearningPathTopic(1, 2, 3, courseId)
    expect(mockServices.fetchLearningPathTopic).toHaveBeenCalledTimes(2)
  })
})
