import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const learningPath = { id: 1, name: 'Math', description: 'Learn math' }
describe('LearningPathSlice', () => {
    mockServices.getLearningPath.mockReturnValue(learningPath)

    it('should fetch learning path from server and cache it', async () => {
        const { fetchLearningPath } = useStore.getState()
        const courseId = "1"
        const topicId = "2"


        const result = await fetchLearningPath(1, 2, 3, courseId, topicId)

        expect(result).toEqual(learningPath)
        expect(fetchLearningPath).toBeDefined()
        expect(fetchLearningPath).toBeInstanceOf(Function)
        expect(mockServices.getLearningPath).toHaveBeenCalledTimes(1)
        expect(mockServices.getLearningPath).toHaveBeenCalledWith(1, 2, 3, courseId, topicId)
        expect(useStore.getState()._cache_learningPath_record[`${courseId}-${topicId}`]).toEqual(learningPath)
    })

    it('should return cached learning path if available', async () => {
        const { fetchLearningPath } = useStore.getState()
        const learningPath = { id: 1, name: 'Math', description: 'Learn math' }
        const courseId = "1"
        const topicId = "2"

        await fetchLearningPath(1, 2, 3, courseId, topicId)

        expect(useStore.getState()._cache_learningPath_record[`${courseId}-${topicId}`]).toEqual(learningPath)

        const cached = await fetchLearningPath(1, 2, 3, courseId, topicId)

        expect(mockServices.getLearningPath).toHaveBeenCalledTimes(1)

        expect(cached).toEqual(learningPath)
    })
})