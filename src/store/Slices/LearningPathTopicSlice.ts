import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { getLearningPathTopic } from '@services'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface LearningPathTopicSlice {
  _cache_learningPathTopic_record: Record<string, LearningPathTopic | undefined>
  fetchLearningPathTopic: LearningPathTopicReturn
}

export const createLearningPathTopicSlice: StateCreator<StoreState, [], [], LearningPathTopicSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathTopic_record: {} }))
  return {
    _cache_learningPathTopic_record: {},
    fetchLearningPathTopic: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId] = arg

      const cached = get()._cache_learningPathTopic_record[`${courseId}`]

      if (!cached) {
        const learningPathTopic_response = await getLearningPathTopic(userId, lmsUserId, studentId, courseId)
        set({
          _cache_learningPathTopic_record: {
            ...get()._cache_learningPathTopic_record,
            [`${courseId}`]: learningPathTopic_response
          }
        })
        return learningPathTopic_response
      } else return cached
    }
  }
}
