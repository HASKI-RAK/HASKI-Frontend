import { Course } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { getCourses } from '@services'
import { resetters } from '../Zustand/Store'

export default interface CoursesSlice {
  _cache_courses: Course[]
  fetchCourses: (userId: number, lmsUserId: number, studentId: number) => Promise<Course[]>
}

export const createCoursesSlice: StateCreator<StoreState, [], [], CoursesSlice> = (set, get) => {
  resetters.push(() => set({ _cache_courses: [] }))
  return {
    _cache_courses: [],
    fetchCourses: async (userId, lmsUserId, studentId) => {
      // Check if we have the courses in cache
      const cached = get()._cache_courses

      if (cached.length === 0) {
        // If not, fetch it and cache it
        const courses_response = await getCourses(userId, lmsUserId, studentId)
        set({ _cache_courses: courses_response })
        return courses_response
      }
      else
        return cached
    }
  }
}
