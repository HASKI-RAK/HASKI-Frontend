import { Course } from '@core'
import { StoreState } from '@store'
import { StateCreator } from 'zustand'

export default interface CourseSlice {
  course: Course
  setCourse: (course: Course) => void
}

export const createCourseSlice: StateCreator<StoreState, [], [], CourseSlice> = (set) => ({
  course: {} as Course,
  setCourse: (course) => set({ course })
})
