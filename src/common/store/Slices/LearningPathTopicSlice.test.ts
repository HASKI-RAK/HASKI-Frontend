import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const learningPathTopic = { id: 1, name: 'Math', description: 'Learn math' }
describe('LearningPathTopicSlice ', () => {
  mockServices.getLearningPathTopic.mockReturnValue(learningPathTopic)

  it('should fetch learning path from server and cache it', async () => {
    const { fetchLearningPathTopic: fetchLearningPathTopic } = useStore.getState()
    const courseId = '2'

    const result = await fetchLearningPathTopic(1, 2, 3, courseId)

    expect(result).toEqual(learningPathTopic)
    expect(fetchLearningPathTopic).toBeDefined()
    expect(mockServices.getLearningPathTopic).toHaveBeenCalledTimes(1)
    expect(mockServices.getLearningPathTopic).toHaveBeenCalledWith(1, 2, 3, courseId)
    expect(useStore.getState()._cache_learningPathTopic_record[`${courseId}`]).toEqual(learningPathTopic)
  })

  it('should return cached learning path if available', async () => {
    const { fetchLearningPathTopic } = useStore.getState()
    const learningPathTopic = { id: 1, name: 'Math', description: 'Learn math' }
    const courseId = '1'

    await fetchLearningPathTopic(1, 2, 3, courseId)

    expect(useStore.getState()._cache_learningPathTopic_record[`${courseId}`]).toEqual(learningPathTopic)

    const cached = await fetchLearningPathTopic(1, 2, 3, courseId)

    expect(mockServices.getLearningPathTopic).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(learningPathTopic)
  })
})
