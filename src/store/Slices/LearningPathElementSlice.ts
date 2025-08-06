import { StateCreator } from 'zustand'
import { LearningPathElement, LearningPathElementReturn } from '@core'
import { fetchLearningPathElement } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type LearningPathElementCache = {
  value?: LearningPathElement
  promise?: Promise<LearningPathElement>
}

export type LearningPathElementSlice = {
  _cache_learningPathElement_record: Record<string, LearningPathElementCache>
  clearLearningPathElementCache: () => void
  getLearningPathElement: LearningPathElementReturn
}

export const createLearningPathElementSlice: StateCreator<StoreState, [], [], LearningPathElementSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _cache_learningPathElement_record: {} }))
  return {
    _cache_learningPathElement_record: {},
    clearLearningPathElementCache: () => {
      set({ _cache_learningPathElement_record: {} })
    },
    getLearningPathElement: async (...arg) => {
      const [userId, lmsUserId, studentId, courseId, topicId] = arg
      const key = `${courseId}-${topicId}`

      // Check if we have the learning path cached
      const cached = get()._cache_learningPathElement_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        // If we have a promise, wait for it to resolve
        return cached.promise
      }

      // Start a new fetch and cache the resulting promise.
      const fetchPromise = fetchLearningPathElement(userId, lmsUserId, studentId, courseId, topicId).then(
        (response: LearningPathElement) => {
          // Once the promise resolves, cache the value.
          set({
            _cache_learningPathElement_record: {
              ...get()._cache_learningPathElement_record,
              [key]: { value: response }
            }
          })
          return response
        }
      )

      // Cache the in-flight promise.
      set({
        _cache_learningPathElement_record: {
          ...get()._cache_learningPathElement_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
