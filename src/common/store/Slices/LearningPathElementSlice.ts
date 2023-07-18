import { LearningPathElement, LearningPathElementReturn } from '@core'
import { getLearningPathElement } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LearningPathSlice {
  _cache_learningPathElement_record: Record<string, LearningPathElement | undefined>
  fetchLearningPathElement: LearningPathElementReturn
}

export const createLearningPathElementSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathElement_record: {} }))
  return {
    _cache_learningPathElement_record: {},
    fetchLearningPathElement: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId, topicId] = arg

      // Check if we have the learning path cached
      const cached = get()._cache_learningPathElement_record[`${courseId}-${topicId}`]

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
      } else return cached
    }
  }
}
