import { StateCreator } from 'zustand'
import { StudentLpLeAlgorithmReturn, StudentLpLeAlgorithmResponse } from '@core'
import { fetchStudentLpLeAlg } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface StudentLpLeAlgorithmSlice {
  _cache_StudentLpLeAlgorithm_record: Record<string, StudentLpLeAlgorithmResponse>
  getStudentLpLeAlgorithm: StudentLpLeAlgorithmReturn
}

export const createStudentLpLeAlgorithmSlice: StateCreator<StoreState, [], [], StudentLpLeAlgorithmSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _cache_StudentLpLeAlgorithm_record: {} }))
  return {
    _cache_StudentLpLeAlgorithm_record: {},
    getStudentLpLeAlgorithm: async (userId, topicId) => {
      const cached = get()._cache_StudentLpLeAlgorithm_record[`${userId}-${topicId}`]
      if (!cached) {
        const studentLpLeAlgorithmResponse = await fetchStudentLpLeAlg(userId, topicId)
        set({
          _cache_StudentLpLeAlgorithm_record: {
            ...get()._cache_StudentLpLeAlgorithm_record,
            [`${userId}-${topicId}`]: studentLpLeAlgorithmResponse
          }
        })
        return studentLpLeAlgorithmResponse
      } else return cached
    }
  }
}
