import { StateCreator } from 'zustand'
import { StudentLpLeAlgorithm, StudentLpLeAlgorithmReturn } from '@core'
import { fetchStudentLpLeAlg } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type StudentLpLeAlgorithmCache = {
  value?: StudentLpLeAlgorithm
  promise?: Promise<StudentLpLeAlgorithm>
}

export type StudentLpLeAlgorithmSlice = {
  _cache_StudentLpLeAlgorithm_record: Record<string, StudentLpLeAlgorithmCache>
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
      const key = `${userId}-${topicId}`
      const cached = get()._cache_StudentLpLeAlgorithm_record[`${userId}-${topicId}`]

      if (cached?.value) {
        return cached.value
      }

      // If there's an in-flight promise, return it.
      if (cached?.promise) {
        return cached.promise
      }

      const fetchPromise = fetchStudentLpLeAlg(userId, topicId).then((response: StudentLpLeAlgorithm) => {
        set({
          _cache_StudentLpLeAlgorithm_record: {
            ...get()._cache_StudentLpLeAlgorithm_record,
            [key]: { value: response }
          }
        })
        return response
      })

      // Cache the in-flight promise.
      set({
        _cache_StudentLpLeAlgorithm_record: {
          ...get()._cache_StudentLpLeAlgorithm_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    },
    setStudentLpLeAlgorithm: (userId, topicId, algorithmName) => {
      if (userId && topicId && algorithmName) {
        const key = `${userId}-${topicId}`

        const updatedState: StudentLpLeAlgorithm = {
          short_name: algorithmName,
          student_id: userId,
          topic_id: topicId
        }
        set({
          _cache_StudentLpLeAlgorithm_record: {
            ...get()._cache_StudentLpLeAlgorithm_record,
            [key]: { value: updatedState }
          }
        })
      }
    }
  }
}
