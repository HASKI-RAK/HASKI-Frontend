import { StateCreator } from 'zustand'
import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { fetchLearningPathTopic } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LearningPathTopicSlice {
  _cache_learningPathTopic_record: Record<string, LearningPathTopic | undefined>
  ignoreLearningPathTopicCache: boolean
  getLearningPathTopic: LearningPathTopicReturn
  triggerLearningPathTopicReload: (reloadState: boolean) => void
}

export const createLearningPathTopicSlice: StateCreator<StoreState, [], [], LearningPathTopicSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathTopic_record: {} }))
  return {
    _cache_learningPathTopic_record: {},
    ignoreLearningPathTopicCache: false,
    getLearningPathTopic: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId] = arg

      const { ignoreLearningPathTopicCache } = get()
      const cached = get()._cache_learningPathTopic_record[`${courseId}`]

      if (!cached || ignoreLearningPathTopicCache) {
        const learningPathTopic_response = await fetchLearningPathTopic(userId, lmsUserId, studentId, courseId)
        set({
          _cache_learningPathTopic_record: {
            ...get()._cache_learningPathTopic_record,
            [`${courseId}`]: learningPathTopic_response
          },
          ignoreLearningPathTopicCache: false
        })
        return learningPathTopic_response
      } else return cached
    },
    triggerLearningPathTopicReload: (reloadState: boolean) => set({ ignoreLearningPathTopicCache: reloadState })
  }
}
