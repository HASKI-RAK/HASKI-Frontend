import { ListK } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { getListK } from '@services'
import { resetters } from '../Zustand/Store'
import { ListKReturn } from '../../core/QuestionnaireResults/ListK'

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
        const listk = await getListK(userId, lmsUserId, studentId)
        set({
          _cache_listk_record: {
            ...get()._cache_listk_record,
            [`${userId}-${lmsUserId}-${studentId}`]: listk
          }
        })
        return listk
      } else return cached
    }
  }
}
