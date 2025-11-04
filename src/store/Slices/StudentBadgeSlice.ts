import { StateCreator } from 'zustand'
import { StudentBadgeResponse, StudentBadgeReturn } from '@core'
import { fetchStudentBadge } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type StudentBadgeCache = {
  value?: StudentBadgeResponse
  promise?: Promise<StudentBadgeResponse>
}

export type StudentBadgeSlice = {
  _cache_studentBadge_record: Record<string, StudentBadgeCache>
  clearStudentBadgeCache: () => void
  getStudentBadge: StudentBadgeReturn
  setStudentBadge: (studentId: string, studentBadges: StudentBadgeResponse) => void
}

export const createStudentBadgeSlice: StateCreator<StoreState, [], [], StudentBadgeSlice> = (set, get) => {
  resetters.push(() =>
    set({
      _cache_studentBadge_record: {}
    })
  )
  return {
    _cache_studentBadge_record: {},
    clearStudentBadgeCache: () => {
      set({ _cache_studentBadge_record: {} })
    },
    getStudentBadge: async (studentId) => {
      const key = String(studentId)

      const cached = get()._cache_studentBadge_record[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        // If we have a promise, wait for it to resolve
        return cached.promise
      }

      const fetchPromise = fetchStudentBadge(studentId).then((response: StudentBadgeResponse) => {
        // Once the promise resolves, cache the value.
        set({
          _cache_studentBadge_record: {
            ...get()._cache_studentBadge_record,
            [key]: { value: response }
          }
        })
        return response
      })

      set({
        _cache_studentBadge_record: {
          ...get()._cache_studentBadge_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    },
    setStudentBadge: (studentId, newStudentBadges) => {
      const key = String(studentId)
      const existing = get()._cache_studentBadge_record[key]?.value || []
      set({
        _cache_studentBadge_record: {
          ...get()._cache_studentBadge_record,
          [key]: { value: [...existing, ...newStudentBadges] }
        }
      })
    }
  }
}
