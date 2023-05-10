import { LearningPath, LearningPathReturn } from '@core'
import { getLearingPath } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'

export default interface LearningPathSlice {
  _cache: Record<string, LearningPath>
  fetchLearningPath: LearningPathReturn
  learningPath: (courseId: number, topicId: number) => LearningPath | undefined
}

export const createLearningPathSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => ({
  _cache: {},
  fetchLearningPath: async (...arg) => {
    // Throw if any of arg is undefined, can be catched by the caller
    if (arg.some((a) => a === undefined)) throw new Error('getLearningPath: Missing argument')
    const [userId, lmsUserId, studentId, courseId, topicId] = arg

    // Check if we have the learning path cached
    const cached = get()._cache[`${courseId}-${topicId}`]
    if (cached) set({ _cache: { ...get()._cache, [`${courseId}-${topicId}`]: cached } })
    else {
      // If not, fetch it and cache it
      const learningPath_response = await getLearingPath(userId, lmsUserId, studentId, courseId, topicId)
      set({ _cache: { ...get()._cache, [`${courseId}-${topicId}`]: learningPath_response } })
    }
    return get()._cache[`${courseId}-${topicId}`]
  },
  learningPath: (courseId, topicId) => {
    return get()._cache[`${courseId}-${topicId}`]
  }
})
