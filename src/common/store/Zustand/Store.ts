import create from 'zustand'
import LearningPathSlice, { createLearningPathSlice } from '../LearningPathSlice/LearningPathSlice'
import UserSlice, { createUserSlice } from '../UserSlice/UserSlice'
import CourseSlice, { createCourseSlice } from '../CourseSlice/CourseSlice'

export type StoreState = UserSlice & LearningPathSlice & CourseSlice

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createLearningPathSlice(...a),
  ...createCourseSlice(...a)
}))
