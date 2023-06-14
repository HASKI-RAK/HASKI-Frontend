import { LearningPathElement, LearningPathElementReturn } from '@core'
import { getLearningPathElement } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'

export default interface LearningPathSlice {
    _cache_learningPathElement_record: Record<string, LearningPathElement | undefined>
    fetchLearningPathElement: LearningPathElementReturn
}

export const createLearningPathElementSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => ({
    _cache_learningPathElement_record: {},
    fetchLearningPathElement: async (...arg) => {
        // Throw if any of arg is undefined, can be catched by the caller
        if (arg.some((a) => a === undefined)) throw new Error('getLearningPath: Missing argument')
        const [userId, lmsUserId, studentId, courseId, topicId] = arg

        // Check if we have the learning path cached
        const cached = get()._cache_learningPathElement_record[`${courseId}-${topicId}`]
        // TODO
        if (!cached) {
            // If not, fetch it and cache it
            const learningPathElement_response = await getLearningPathElement(userId, lmsUserId, studentId, courseId, topicId)
            set({
                _cache_learningPathElement_record: {
                    ...get()._cache_learningPathElement_record,
                    [`${courseId}-${topicId}`]: learningPathElement_response
                }
            })
            return learningPathElement_response
        }
        if (get()._cache_learningPathElement_record[`${courseId}-${topicId}`] === undefined)
            throw new Error('getLearningPathElement: Learning path not found')
        return get()._cache_learningPathElement_record[`${courseId}-${topicId}`]!
    }
})