import create from 'zustand'
import LearningPathSlice, { createLearningPathSlice } from '../LearningPathSlice/LearningPathSlice'
import UserSlice, { createUserSlice } from '../UserSlice/UserSlice'
import CourseSlice, { createCourseSlice } from '../CourseSlice/CourseSlice'
import CoursesSlice, { createCoursesSlice } from '../CoursesSlice/CoursesSlice'
import { devtools, persist } from 'zustand/middleware'

export type StoreState = UserSlice & LearningPathSlice & CourseSlice & CoursesSlice

export const useBoundStore = create<StoreState>()(devtools(persist((...a) => ({
  ...createLearningPathSlice(...a),
  ...createUserSlice(...a),
  ...createCourseSlice(...a),
  ...createCoursesSlice(...a)
}), {
  name: 'bound-storage', // unique name for the storage
  // take Persisted type from UserSlice, do not use explicit property names
  partialize: (state) => (
    {
      _user: state._user,
    }
  ), // persist only the _user field
  getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  onRehydrateStorage: () => { console.log('BoundStore hydration starts') }
})))