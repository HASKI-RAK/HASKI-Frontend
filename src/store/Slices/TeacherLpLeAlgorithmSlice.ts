import { StateCreator } from 'zustand'
import { TeacherLpLeAlgorithm, TeacherLpLeAlgorithmReturn } from '@core'
import { fetchTeacherLpLeAlg } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type TeacherLpLeAlgorithmCache = {
  value?: TeacherLpLeAlgorithm
  promise?: Promise<TeacherLpLeAlgorithm>
}

export type TeacherLpLeAlgorithmSlice = {
  _cache_TeacherLpLeAlgorithm_record: Record<string, TeacherLpLeAlgorithmCache>
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
      const key = `${topicId}`
      const cached = get()._cache_TeacherLpLeAlgorithm_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchTeacherLpLeAlg(topicId).then((response: TeacherLpLeAlgorithm) => {
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [key]: { value: response }
          }
        })
        return response
      })

      // Cache the in-flight promise.
      set({
        _cache_TeacherLpLeAlgorithm_record: {
          ...get()._cache_TeacherLpLeAlgorithm_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    },
    setTeacherLpLeAlgorithm: (topicId, algorithmName) => {
      if (topicId && algorithmName) {
        const key = `${topicId}`
        const updatedState: TeacherLpLeAlgorithm = {
          short_name: algorithmName,
          topic_id: topicId
        }
        set({
          _cache_TeacherLpLeAlgorithm_record: {
            ...get()._cache_TeacherLpLeAlgorithm_record,
            [key]: { value: updatedState }
          }
        })
      }
    }
  }
}
