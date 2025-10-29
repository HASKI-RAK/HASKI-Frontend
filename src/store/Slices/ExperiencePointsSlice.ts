import { StateCreator } from 'zustand'
import { ExperiencePoints, ExperiencePointsReturn } from '@core'
import { fetchExperiencePoints } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type ExperiencePointsCache = {
  value?: ExperiencePoints
  promise?: Promise<ExperiencePoints>
}

export type ExperiencePointsSlice = {
  _cache_experiencePoints_record: Record<string, ExperiencePointsCache>
  clearExperiencePointsCache: () => void
  getExperiencePoints: ExperiencePointsReturn
  setExperiencePoints: (studentId: number, experiencePoints: ExperiencePoints) => void
}

export const createExperiencePointsSlice: StateCreator<StoreState, [], [], ExperiencePointsSlice> = (set, get) => {
  resetters.push(() =>
    set({
      _cache_experiencePoints_record: {}
    })
  )
  return {
    _cache_experiencePoints_record: {},
    clearExperiencePointsCache: () => {
      set({ _cache_experiencePoints_record: {} })
    },
    getExperiencePoints: async (studentId) => {
      const key = String(studentId)

      // Check if we have the experience points cached
      const cached = get()._cache_experiencePoints_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        // If we have a promise, wait for it to resolve
        return cached.promise
      }

      // Start a new fetch and cache the resulting promise.
      const fetchPromise = fetchExperiencePoints(studentId).then((response: ExperiencePoints) => {
        // Once the promise resolves, cache the value.
        set({
          _cache_experiencePoints_record: {
            ...get()._cache_experiencePoints_record,
            [key]: { value: response }
          }
        })
        return response
      })

      // Cache the in-flight promise.
      set({
        _cache_experiencePoints_record: {
          ...get()._cache_experiencePoints_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    },
    setExperiencePoints: (studentId, experiencePoints) => {
      const key = String(studentId)
      set({
        _cache_experiencePoints_record: {
          ...get()._cache_experiencePoints_record,
          [key]: { value: experiencePoints }
        }
      })
    }
  }
}
