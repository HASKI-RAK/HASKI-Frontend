import { StateCreator } from 'zustand'
import { DefaultLearningPathResponse } from '@core'
import { fetchDefaultLearningPath } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

type fetchDefaultLearningPathProps = {
  userId: number
  lmsUserId: number
}

export default interface DefaultLearningPathSlice {
  _defaultLearningPath: Record<string, DefaultLearningPathResponse[]>
  getDefaultLearningPath: ({
    userId,
    lmsUserId
  }: fetchDefaultLearningPathProps) => Promise<DefaultLearningPathResponse[]>
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
      const [{ userId, lmsUserId }] = arg
      // Check if we have the courses in cache
      const cached = get()._defaultLearningPath[`${userId}-${lmsUserId}`]

      if (!cached) {
        // If not, fetch it and cache it
        const defaultLearningPathResponse = await fetchDefaultLearningPath({ userId, lmsUserId })
        set({
          _defaultLearningPath: {
            ...get()._defaultLearningPath,
            [`${userId}-${lmsUserId}`]: defaultLearningPathResponse
          }
        })
        return defaultLearningPathResponse
      } else return cached
    }
  }
}
