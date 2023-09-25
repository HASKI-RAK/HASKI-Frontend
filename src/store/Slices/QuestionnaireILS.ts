import { ILS } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { getILS } from '@services'
// Import can not be shortened
import { resetters } from '../Zustand/Store'
import { ILSReturn } from '@core'
import log from "loglevel";

export default interface ILSSlice {
  _cache_ils_record: Record<string, ILS | undefined>
  fetchILS: ILSReturn
}

export const createILSSlice: StateCreator<StoreState, [], [], ILSSlice> = (set, get) => {
  resetters.push(() => set({ _cache_ils_record: {} }))
  return {
    _cache_ils_record: {},
    fetchILS: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg

      const cached = get()._cache_ils_record[`${userId}-${lmsUserId}-${studentId}`]

      if (!cached) {
        return getILS(userId, lmsUserId, studentId).then((ils) => {
          set({
            _cache_ils_record: {
              ...get()._cache_ils_record,
              [`${userId}-${lmsUserId}-${studentId}`]: ils
            }
          })
          return ils
        }).catch((err) => {
            log.error(err)
            return undefined
        })
      }
        else return cached
    }
  }
}
