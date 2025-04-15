import { StateCreator } from 'zustand'
import { CourseResponse, CourseReturn } from '@core'
import { fetchCourses } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

type CoursesCache = {
  value?: CourseResponse
  promise?: Promise<CourseResponse>
}

export type CoursesSlice = {
  _cache_Courses_record: Record<string, CoursesCache>
  getCourses: CourseReturn
  clearCoursesCache: () => void
}

export const createCoursesSlice: StateCreator<StoreState, [], [], CoursesSlice> = (set, get) => {
  resetters.push(() => set({ _cache_Courses_record: {} }))
  return {
    _cache_Courses_record: {},
    clearCoursesCache: () => {
      set({ _cache_Courses_record: {} })
    },
    getCourses: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg
      const key = `${userId}-${lmsUserId}-${studentId}`

      // Check if we have the courses in cache
      const cached = get()._cache_Courses_record[key]

      if (cached?.value) {
        return cached.value
      }

      // If a fetch is already in-flight, wait for it.
      if (cached?.promise) {
        return cached.promise
      }

      // Start a new fetch, cache its promise immediately.
      const fetchPromise = fetchCourses(userId, lmsUserId, studentId).then((coursesResponse: CourseResponse) => {
        // Once the promise resolves, cache the value.
        set({
          _cache_Courses_record: {
            ...get()._cache_Courses_record,
            [key]: { value: coursesResponse }
          }
        })
        return coursesResponse
      })

      // Cache the in-flight promise.
      set({
        _cache_Courses_record: {
          ...get()._cache_Courses_record,
          [key]: { promise: fetchPromise }
        }
      })

      return fetchPromise
    }
  }
}
