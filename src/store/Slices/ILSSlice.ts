import { StateCreator } from 'zustand'
import { ILS } from '@core'
import { fetchILS } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export type ILSSlice = {
  _ils: Record<string, ILS | undefined>
  getILS: (userId: number, lmsUserId: number, studentId: number) => ILS | undefined
  clearILSCache: () => void
}

export const createILSSlice: StateCreator<PersistedStoreState, [], [], ILSSlice> = (set, get) => {
  resetters.push(() => set({ _ils: {} }))
  return {
    _ils: {},
    clearILSCache: () => {
      set({ _ils: {} })
    },
    getILS: (userId: number, lmsUserId: number, studentId: number) => {
      const key = `${userId}-${lmsUserId}-${studentId}`

      const cached = get()._ils[key]

      if (cached) {
        return cached
      }

      fetchILS(userId, lmsUserId, studentId).then((ils) => {
        set({ _ils: { [key]: ils } })
        return ils
      })

      return undefined
    }
  }
}
