import { StateCreator } from 'zustand'
import { LearningPathElementSolution, LearningPathElementSolutionReturn } from '@core'
import { fetchLearningPathElementSolution } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type LearningPathElementSolutionCache = {
  value?: LearningPathElementSolution
  promise?: Promise<LearningPathElementSolution>
}

export type LearningPathElementSolutionSlice = {
  _cache_learningPathElementSolution_record: Record<string, LearningPathElementSolutionCache>
  clearLearningPathElementSolutionCache: () => void
  getLearningPathElementSolution: LearningPathElementSolutionReturn
}

export const createLearningPathElementSolutionSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningPathElementSolutionSlice
> = (set, get) => {
  resetters.push(() => set({ _cache_learningPathElementSolution_record: {} }))
  return {
    _cache_learningPathElementSolution_record: {},
    clearLearningPathElementSolutionCache: () => {
      set({ _cache_learningPathElementSolution_record: {} })
    },
    getLearningPathElementSolution: async (...arg) => {
      const [topicId] = arg
      const key = `${topicId}`

      // Check if we have the learning path solution cached
      const cached = get()._cache_learningPathElementSolution_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        // If we have a promise, wait for it to resolve
        return cached.promise
      }

      // Start a new fetch and cache the resulting promise.
      const fetchPromise = fetchLearningPathElementSolution(topicId).then((response: LearningPathElementSolution) => {
        // Once the promise resolves, cache the value.
        set({
          _cache_learningPathElementSolution_record: {
            ...get()._cache_learningPathElementSolution_record,
            [key]: { value: response }
          }
        })
        return response
      })

      // Cache the in-flight promise.
      set({
        _cache_learningPathElementSolution_record: {
          ...get()._cache_learningPathElementSolution_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
