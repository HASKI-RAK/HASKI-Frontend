import { StateCreator } from 'zustand'
import { CourseResponse, CourseReturn } from '@core'
import { fetchCourses } from '@services'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface CoursesSlice {
  _cache_Courses_record: Record<string, CourseResponse>
  getCourses: CourseReturn
  ignoreCoursesCache: boolean
  triggerCoursesReload: (reloadState: boolean) => void
}

export const createCoursesSlice: StateCreator<StoreState, [], [], CoursesSlice> = (set, get) => {
  resetters.push(() => set({ _cache_Courses_record: {} }))
  return {
    _cache_Courses_record: {},
    ignoreCoursesCache: false,
    getCourses: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg
      const { ignoreCoursesCache } = get()
      // Check if we have the courses in cache
      const cached = get()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]

      if (!cached || ignoreCoursesCache) {
        // If not, fetch it and cache it
        const coursesResponse = await fetchCourses(userId, lmsUserId, studentId)
        set({
          _cache_Courses_record: {
            ...get()._cache_Courses_record,
            [`${userId}-${lmsUserId}-${studentId}`]: coursesResponse
          },
          ignoreCoursesCache: false
        })
        return coursesResponse
      } else return cached
    },
    triggerCoursesReload: (reloadState: boolean) => set({ ignoreCoursesCache: reloadState })
  }
}
