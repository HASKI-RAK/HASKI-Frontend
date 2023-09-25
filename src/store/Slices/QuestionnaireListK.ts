import { ListK, ListKReturn } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
// Import can not be shortened
import { resetters } from '../Zustand/Store'
import { getListK } from '@services'
import log from "loglevel";

export default interface ListKSlice {
  _cache_listk_record: Record<string, ListK | undefined>
  fetchListK: ListKReturn
}

export const createListKSlice: StateCreator<StoreState, [], [], ListKSlice> = (set, get) => {
  resetters.push(() => set({ _cache_listk_record: {} }))
  return {
    _cache_listk_record: {},
    fetchListK: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg

      const cached = get()._cache_listk_record[`${userId}-${lmsUserId}-${studentId}`]

      if (!cached) {
        return getListK(userId, lmsUserId, studentId).then((listk) => {
          set({
            _cache_listk_record: {
              ...get()._cache_listk_record,
              [`${userId}-${lmsUserId}-${studentId}`]: listk
            }
          })
          return listk
        }).catch((err) => {
          log.error(err)
          return undefined
        })

      } else return cached
    }
  }
}
