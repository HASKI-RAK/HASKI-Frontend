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
    getTeacherLpLeAlgorithm: async (topicId) => {
      const cached = get()._cache_TeacherLpLeAlgorithm_record[`${topicId}`]
      if (!cached) {
        const teacherLpLeAlgorithmResponse = await fetchTeacherLpLeAlg(topicId)
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [`${topicId}`]: teacherLpLeAlgorithmResponse
          }
        })
        return teacherLpLeAlgorithmResponse
      } else return cached
    }
  }
}
