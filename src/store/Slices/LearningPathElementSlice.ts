import { StateCreator } from 'zustand'
import { LearningPathElement, LearningPathElementReturn } from '@core'
import { fetchLearningPathElement } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LearningPathSlice {
  _cache_learningPathElement_record: Record<string, LearningPathElement | undefined>
  ignoreLearningPathElementCache: boolean
  getLearningPathElement: LearningPathElementReturn
  triggerLearningPathElementReload: (reloadState: boolean) => void
}

export const createLearningPathElementSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathElement_record: {} }))
  return {
    _cache_learningPathElement_record: {},
    ignoreLearningPathElementCache: false,
    getLearningPathElement: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId, topicId] = arg
      const { ignoreLearningPathElementCache } = get()

      // Check if we have the learning path cached
      const cached = get()._cache_learningPathElement_record[`${courseId}-${topicId}`]

      if (!cached || ignoreLearningPathElementCache) {
        // If not, fetch it and cache it
        const learningPathElement_response = await fetchLearningPathElement(
          userId,
          lmsUserId,
          studentId,
          courseId,
          topicId
        )
        set({
          _cache_learningPathElement_record: {
            ...get()._cache_learningPathElement_record,
            [`${courseId}-${topicId}`]: learningPathElement_response
          },
          ignoreLearningPathElementCache: false
        })
        return learningPathElement_response
      } else return cached
    },
    triggerLearningPathElementReload: (reloadState: boolean) => set({ ignoreLearningPathElementCache: reloadState })
  }
}
