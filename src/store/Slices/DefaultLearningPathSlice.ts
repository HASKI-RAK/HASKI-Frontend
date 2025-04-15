import { StateCreator } from 'zustand'
import { DefaultLearningPathResponse } from '@core'
import { fetchDefaultLearningPath } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

type DefaultLearningPathCache = {
  value?: DefaultLearningPathResponse[]
  promise?: Promise<DefaultLearningPathResponse[]>
}

export type DefaultLearningPathSlice = {
  _defaultLearningPath: Record<string, DefaultLearningPathCache>
  getDefaultLearningPath: (userId: number, lmsUserId: number) => Promise<DefaultLearningPathResponse[]>
  clearDefaultLearningPathCache: () => void
}

export const createDefaultLearningPathSlice: StateCreator<PersistedStoreState, [], [], DefaultLearningPathSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _defaultLearningPath: {} }))
  return {
    _defaultLearningPath: {},
    clearDefaultLearningPathCache: () => {
      set({ _defaultLearningPath: {} })
    },
    getDefaultLearningPath: async (...arg) => {
      const [userId, lmsUserId] = arg
      const key = `${userId}-${lmsUserId}`

      const cached = get()._defaultLearningPath[key]

      if (cached?.value) {
        return cached.value
      }

      // If a fetch is already in progress, return that promise.
      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchDefaultLearningPath(userId, lmsUserId).then(
        (response: DefaultLearningPathResponse[]) => {
          // Once the promise resolves, cache the response as the value.
          set({
            _defaultLearningPath: {
              ...get()._defaultLearningPath,
              [key]: { value: response }
            }
          })
          return response
        }
      )

      // Cache the in-flight promise.
      set({
        _defaultLearningPath: {
          ...get()._defaultLearningPath,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
