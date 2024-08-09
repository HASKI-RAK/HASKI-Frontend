import { StateCreator } from 'zustand'
import { TeacherLpLeAlgorithmReturn, TeacherLpLeAlgorithmResponse } from '@core'
import { fetchTeacherLpLeAlg } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface TeacherLpLeAlgorithmSlice {
  _cache_TeacherLpLeAlgorithm_record: Record<string, TeacherLpLeAlgorithmResponse>
  getTeacherLpLeAlgorithm: TeacherLpLeAlgorithmReturn
}

export const createTeacherLpLeAlgorithmSlice: StateCreator<StoreState, [], [], TeacherLpLeAlgorithmSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _cache_TeacherLpLeAlgorithm_record: {} }))
  return {
    _cache_TeacherLpLeAlgorithm_record: {},
    getTeacherLpLeAlgorithm: async (...arg) => {
      const [userId, topicId] = arg
      const cached = get()._cache_TeacherLpLeAlgorithm_record[`${userId}-${topicId}`]
      if (!cached) {
        const teacherLpLeAlgorithmResponse = await fetchTeacherLpLeAlg(userId)
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [`${userId}-${topicId}`]: teacherLpLeAlgorithmResponse
          }
        })
        return teacherLpLeAlgorithmResponse
      } else return cached
    }
  }
}
