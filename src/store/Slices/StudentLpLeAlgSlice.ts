import { StateCreator } from 'zustand'
import { StudentLpLeAlgorithm, StudentLpLeAlgorithmReturn } from '@core'
import { fetchStudentLpLeAlg } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface StudentLpLeAlgorithmSlice {
  _cache_StudentLpLeAlgorithm_record: Record<string, StudentLpLeAlgorithm>
  getStudentLpLeAlgorithm: StudentLpLeAlgorithmReturn
  setStudentLpLeAlgorithm: (userId?: number, topicId?: number, algorithmName?: string) => void
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
    },
    setStudentLpLeAlgorithm: (userId, topicId, algorithmName) => {
      if (userId && topicId && algorithmName) {
        const updatedState = {
          short_name: algorithmName,
          student_id: userId,
          topic_id: topicId
        }
        set({
          _cache_StudentLpLeAlgorithm_record: {
            ...get()._cache_StudentLpLeAlgorithm_record,
            [`${userId}-${topicId}`]: updatedState
          }
        })
      }
    }
  }
}
