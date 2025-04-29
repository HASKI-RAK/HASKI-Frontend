import { StateCreator } from 'zustand'
import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { fetchLearningPathTopic } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type LearningPathTopicCache = {
  value?: LearningPathTopic
  promise?: Promise<LearningPathTopic>
}

export type LearningPathTopicSlice = {
  _cache_learningPathTopic_record: Record<string, LearningPathTopicCache>
  clearLearningPathTopicCache: () => void
  getLearningPathTopic: LearningPathTopicReturn
}

export const createLearningPathTopicSlice: StateCreator<StoreState, [], [], LearningPathTopicSlice> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathTopic_record: {} }))
  return {
    _cache_learningPathTopic_record: {},
    clearLearningPathTopicCache: () => {
      set({ _cache_learningPathTopic_record: {} })
    },
    getLearningPathTopic: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId] = arg
      const key = `${courseId}`

      const cached = get()._cache_learningPathTopic_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchLearningPathTopic(userId, lmsUserId, studentId, courseId).then(
        (response: LearningPathTopic) => {
          set({
            _cache_learningPathTopic_record: {
              ...get()._cache_learningPathTopic_record,
              [key]: { value: response }
            }
          })
          return response
        }
      )

      // Cache the in-flight promise.
      set({
        _cache_learningPathTopic_record: {
          ...get()._cache_learningPathTopic_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
