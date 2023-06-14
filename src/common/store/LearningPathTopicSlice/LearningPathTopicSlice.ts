import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { getLearningPathTopic } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'

export default interface LearningPathTopicSlice {
    _cache_topicPath_record: Record<string, LearningPathTopic | undefined>
    fetchLearningPathTopic: LearningPathTopicReturn
}

export const createLearningPathTopicSlice: StateCreator<StoreState, [], [], LearningPathTopicSlice> = (set, get) => ({
    _cache_topicPath_record: {},
    fetchLearningPathTopic: async (...arg) => {
        // Throw if any of arg is undefined, can be catched by the caller
        if (arg.some((a) => a === undefined)) throw new Error('getLearningPathTopic: Missing argument')
        const [userId, lmsUserId, studentId, courseId] = arg

        // Check if we have the learning path cached
        const cached = get()._cache_topicPath_record[`${courseId}`]
        // TODO
        if (!cached) {
            // If not, fetch it and cache it
            const learningPathTopic_response = await getLearningPathTopic(userId, lmsUserId, studentId, courseId)
            set({
                _cache_topicPath_record: {
                    ...get()._cache_topicPath_record,
                    [`${courseId}`]: learningPathTopic_response
                }
            })
            return learningPathTopic_response
        }
        if (get()._cache_topicPath_record[`${courseId}`] === undefined)
            throw new Error('getLearningPathTopic: Learning path not found')
        return get()._cache_topicPath_record[`${courseId}`]!
    }
})
