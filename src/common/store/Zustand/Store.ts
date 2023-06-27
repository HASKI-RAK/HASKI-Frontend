import create from 'zustand'
import LearningPathElementSlice, { createLearningPathElementSlice } from '../Slices/LearningPathElementSlice'
import UserSlice, { createUserSlice } from '../Slices/UserSlice'
import CourseSlice, { createCourseSlice } from '../Slices/CourseSlice'
import CoursesSlice, { createCoursesSlice } from '../Slices/CoursesSlice'
import LearningPathTopicSlice, { createLearningPathTopicSlice } from '../Slices/LearningPathTopicSlice'
import AuthSlice, { createAuthSlice } from '../Slices/AuthSlice'
import log from 'loglevel'
import { devtools, persist } from 'zustand/middleware'

export type StoreState = LearningPathElementSlice & CourseSlice & CoursesSlice & LearningPathTopicSlice
export type PersistedStoreState = UserSlice & AuthSlice

export const useStore = create<StoreState>()((...a) => ({
  ...createLearningPathElementSlice(...a),
  ...createLearningPathTopicSlice(...a),
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
