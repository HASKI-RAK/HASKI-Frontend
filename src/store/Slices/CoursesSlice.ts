import { CourseReturn } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { getCourses } from '@services'
import { resetters } from '../Zustand/Store'
import { CourseResponse } from '../../core/Course/Course'

export default interface CoursesSlice {
  _cache_Courses_record: Record<string, CourseResponse>
  fetchCourses: CourseReturn
}

export const createCoursesSlice: StateCreator<StoreState, [], [], CoursesSlice> = (set, get) => {
  resetters.push(() => set({ _cache_Courses_record: {} }))
  return {
    _cache_Courses_record: {},
    fetchCourses: async (...arg) => {
      const [userId, lmsUserId, studentId] = arg

      // Check if we have the courses in cache
      const cached = get()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]

      if (!cached) {
        // If not, fetch it and cache it
        const coursesResponse = await getCourses(userId, lmsUserId, studentId)
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