import { TeacherLpLeAlgorithm, TeacherLpLeAlgorithmReturn } from '@core'
import { fetchTeacherLpLeAlg } from '@services'
import { StoreState } from '@store'
import { StateCreator } from 'zustand'

import { resetters } from '../Zustand/Store'

export default interface TeacherLpLeAlgorithmSlice {
  _cache_TeacherLpLeAlgorithm_record: Record<string, TeacherLpLeAlgorithm>
  getTeacherLpLeAlgorithm: TeacherLpLeAlgorithmReturn
  setTeacherLpLeAlgorithm: (topicId?: number, algorithmName?: string) => void
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
        const teacherLpLeAlgorithm = await fetchTeacherLpLeAlg(topicId)
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [`${topicId}`]: teacherLpLeAlgorithm
          }
        })
        return teacherLpLeAlgorithm
      } else return cached
    },
    setTeacherLpLeAlgorithm: (topicId, algorithmName) => {
      if (topicId && algorithmName) {
        const updatedState = {
          short_name: algorithmName,
          topic_id: topicId
        }
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [`${topicId}`]: updatedState
          }
        })
      }
    }
  }
}
