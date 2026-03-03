import { StateCreator } from 'zustand'
import { GamificationSettings, GamificationSettingsReturn } from '@core'
import { fetchGamificationSettings } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

type GamificationSettingsCache = {
  value?: GamificationSettings
  promise?: Promise<GamificationSettings>
}

export type GamificationSettingsSlice = {
  _cache_gamificationSettings_record: Record<number, GamificationSettingsCache>
  clearGamificationSettingsCache: () => void
  getGamificationSettings: GamificationSettingsReturn
  setGamificationSettings: (studentId: number, gamificationSettings: GamificationSettings) => void
}

export const createGamificationSettingsSlice: StateCreator<PersistedStoreState, [], [], GamificationSettingsSlice> = (
  set,
  get
) => {
  resetters.push(() =>
    set({
      _cache_gamificationSettings_record: {}
    })
  )
  return {
    _cache_gamificationSettings_record: {},
    clearGamificationSettingsCache: () => {
      set({ _cache_gamificationSettings_record: {} })
    },
    getGamificationSettings: async (studentId: number) => {
      const key = studentId

      const cached = get()._cache_gamificationSettings_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchGamificationSettings(studentId).then((response: GamificationSettings) => {
        set({
          _cache_gamificationSettings_record: {
            ...get()._cache_gamificationSettings_record,
            [key]: { value: response }
          }
        })
        return response
      })

      set({
        _cache_gamificationSettings_record: {
          ...get()._cache_gamificationSettings_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    },
    setGamificationSettings: (studentId: number, gamificationSettings: GamificationSettings) => {
      const key = studentId
      set({
        _cache_gamificationSettings_record: {
          ...get()._cache_gamificationSettings_record,
          [key]: { value: gamificationSettings }
        }
      })
    }
  }
}
