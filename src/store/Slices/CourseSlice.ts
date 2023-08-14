import { Course } from '@core'
import { StoreState } from '@store'
import { StateCreator } from 'zustand'
import { resetters } from '../Zustand/Store'

export default interface CourseSlice {
  course: Course
  setCourse: (course: Course) => void
}

export const createCourseSlice: StateCreator<StoreState, [], [], CourseSlice> = (set) => {
  resetters.push(() => set({ course: {} as Course }))
  return {
    course: {} as Course,
    setCourse: (course) => set({ course })
  }
}
