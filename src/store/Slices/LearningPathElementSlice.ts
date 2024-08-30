import { StateCreator } from 'zustand'
import { LearningPathElement, LearningPathElementReturn } from '@core'
import { fetchLearningPathElement } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LearningPathSlice {
  _cache_learningPathElement_record: Record<string, LearningPathElement | undefined>
  ignoreLearningElementCache: boolean
  getLearningPathElement: LearningPathElementReturn
  triggerLearningElementReload: (reloadState: boolean) => void
}

export const createLearningPathElementSlice: StateCreator<StoreState, [], [], LearningPathSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathElement_record: {} }))
  return {
    _cache_learningPathElement_record: {},
    ignoreLearningElementCache: false,
    getLearningPathElement: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId, topicId] = arg
      const { ignoreLearningElementCache } = get()

      // Check if we have the learning path cached
      const cached = get()._cache_learningPathElement_record[`${courseId}-${topicId}`]

      if (!cached || ignoreLearningElementCache) {
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
          ignoreLearningElementCache: false
        })
        return learningPathElement_response
      } else return cached
    },
    triggerLearningElementReload: (reloadState: boolean) => set({ ignoreLearningPathTopicCache: reloadState })
  }
}
