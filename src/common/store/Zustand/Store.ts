import create from 'zustand'
import log from 'loglevel'
import { devtools, persist } from 'zustand/middleware'
import LearningPathSlice, { createLearningPathSlice } from '../Slices/LearningPathSlice'
import UserSlice, { createUserSlice } from '../Slices/UserSlice'
import CourseSlice, { createCourseSlice } from '../Slices/CourseSlice'
import CoursesSlice, { createCoursesSlice } from '../Slices/CoursesSlice'
import AuthSlice, { createAuthSlice } from '../Slices/AuthSlice'

export type StoreState = LearningPathSlice & CourseSlice & CoursesSlice
export type PersistedStoreState = UserSlice & AuthSlice

export const resetters: (() => void)[] = []

export const useStore = create<StoreState>()((...a) => ({
  ...createLearningPathSlice(...a),
  ...createCourseSlice(...a),
  ...createCoursesSlice(...a)
}))

export const usePersistedStore = create<PersistedStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createAuthSlice(...a)
      }),
      {
        name: 'persisted_storage',
        // Here we can whitelist the keys we want to persist
        partialize: (state) => ({
          _user: state._user,
          expire: state.expire
        }),
        onRehydrateStorage: () => {
          log.debug('PersistedStore hydration starts')
        },
        version: 1 // When this changes, the persisted data will be discarded and the store reinitialized (Useful for migrations)
      }
    )
  )
)
export const resetAllSlices = () => {
  console.log('resetAllSlices:' + resetters.length)
  resetters.forEach((resetter) => resetter())
}
