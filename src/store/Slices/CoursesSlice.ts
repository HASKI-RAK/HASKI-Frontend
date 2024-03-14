import { StateCreator } from 'zustand'
import { CourseReturn } from '@core'
import { fetchCourses } from '@services'
import { StoreState } from '@store'
import { CourseResponse } from '../../core/Course/Course'
import { resetters } from '../Zustand/Store'

export default interface CoursesSlice {
  _cache_Courses_record: Record<string, CourseResponse>
  getCourses: CourseReturn
}

export const createCoursesSlice: StateCreator<StoreState, [], [], CoursesSlice> = (set, get) => {
  resetters.push(() => set({ _cache_Courses_record: {} }))
  return {
    _cache_Courses_record: {},
    getCourses: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg

      // Check if we have the courses in cache
      const cached = get()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]

      if (!cached) {
        // If not, fetch it and cache it
        const coursesResponse = await fetchCourses(userId, lmsUserId, studentId)
        set({
          _cache_Courses_record: {
            ...get()._cache_Courses_record,
            [`${userId}-${lmsUserId}-${studentId}`]: coursesResponse
          }
        })
        return coursesResponse
      } else return cached
    }
  }
}
