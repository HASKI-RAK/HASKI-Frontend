import { LearningPath, LearningPathReturn } from '@core'
import { getLearningPath } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'

export default interface LearningPathSlice {
  _cache_learningPath_record: Record<string, LearningPath | undefined>
  fetchLearningPath: LearningPathReturn
}

export const createLearningPathSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => ({
  _cache_learningPath_record: {},
  fetchLearningPath: async (...arg) => {
    // Throw if any of arg is undefined, can be catched by the caller
    if (arg.some((a) => a === undefined)) throw new Error('getLearningPath: Missing argument')
    const [userId, lmsUserId, studentId, courseId, topicId] = arg

    // Check if we have the learning path cached
    const cached = get()._cache_learningPath_record[`${courseId}-${topicId}`]
    // TODO
    if (!cached) {
      // If not, fetch it and cache it
      const learningPath_response = await getLearningPath(userId, lmsUserId, studentId, courseId, topicId)
      set({
        _cache_learningPath_record: {
          ...get()._cache_learningPath_record,
          [`${courseId}-${topicId}`]: learningPath_response
        }
      })
      return learningPath_response
    }
    if (get()._cache_learningPath_record[`${courseId}-${topicId}`] === undefined)
      throw new Error('getLearningPath: Learning path not found')
    return get()._cache_learningPath_record[`${courseId}-${topicId}`]!
  }
})
