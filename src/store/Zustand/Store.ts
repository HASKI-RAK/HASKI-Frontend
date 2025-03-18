import log from 'loglevel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import AuthSlice, { createAuthSlice } from '../Slices/AuthSlice'
import CourseSlice, { createCourseSlice } from '../Slices/CourseSlice'
import CoursesSlice, { createCoursesSlice } from '../Slices/CoursesSlice'
import DisabledClassificationsSlice, { createDisabledClassifications } from '../Slices/DisabledClassificationsSlice'
import LearningPathElementSlice, { createLearningPathElementSlice } from '../Slices/LearningPathElementSlice'
import LearningPathElementSpecificStatusSlice, {
  createLearningPathElementSpecificStatusSlice
} from '../Slices/LearningPathElementSpecificStatusSlice'
import {
  LearningPathElementStatusSlice,
  createLearningPathElementStatusSlice
} from '../Slices/LearningPathElementStatusSlice'
import LearningPathTopicSlice, { createLearningPathTopicSlice } from '../Slices/LearningPathTopicSlice'
import NewsSlice, { createNewsSlice } from '../Slices/NewsSlice'
import RemoteTopicsSlice, { createRemoteTopicsSlice } from '../Slices/RemoteTopicsSlice'
import StudentLpLeAlgorithmSlice, { createStudentLpLeAlgorithmSlice } from '../Slices/StudentLpLeAlgSlice'
import TeacherLpLeAlgorithmSlice, { createTeacherLpLeAlgorithmSlice } from '../Slices/TeacherLpLeAlgorithmSlice'
import UserSlice, { createUserSlice } from '../Slices/UserSlice'
import xAPISlice, { createXAPISlice } from '../Slices/xAPISlice'

export type StoreState = LearningPathElementSlice &
  CourseSlice &
  CoursesSlice &
  LearningPathTopicSlice &
  LearningPathElementSpecificStatusSlice &
  RemoteTopicsSlice &
  TeacherLpLeAlgorithmSlice &
  StudentLpLeAlgorithmSlice
export type PersistedStoreState = UserSlice &
  AuthSlice &
  LearningPathElementStatusSlice &
  xAPISlice &
  DisabledClassificationsSlice
export type SessionStoreState = NewsSlice

export const resetters: (() => void)[] = []

export const useStore = create<StoreState>()((...a) => ({
  ...createLearningPathElementSlice(...a),
  ...createLearningPathTopicSlice(...a),
  ...createCourseSlice(...a),
  ...createCoursesSlice(...a),
  ...createLearningPathElementSpecificStatusSlice(...a),
  ...createRemoteTopicsSlice(...a),
  ...createTeacherLpLeAlgorithmSlice(...a),
  ...createStudentLpLeAlgorithmSlice(...a)
}))

export const usePersistedStore = create<PersistedStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createLearningPathElementStatusSlice(...a),
        ...createDisabledClassifications(...a),
        ...createAuthSlice(...a),
        ...createXAPISlice(...a)
      }),
      {
        name: 'persisted_storage',
        // Here we can whitelist the keys we want to persist
        partialize: (state) => ({
          _user: state._user,
          _learningPathElementStatus: state._learningPathElementStatus,
          _cache_disabledClassifications: state._disabledClassifications,
          expire: state.expire
        }),
        onRehydrateStorage: () => {
          log.debug('PersistedStore hydration starts')
        },
        version: 1.1 // When this changes, the persisted data will be discarded and the store reinitialized (Useful for migrations)
      }
    )
  )
)
export const useSessionStore = create<SessionStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createNewsSlice(...a)
      }),
      {
        name: 'session_storage',
        // Here we can whitelist the keys we want to persist
        getStorage: () => sessionStorage,
        partialize: (state) => ({
          isBannerOpen: state.isBannerOpen
        }),

        version: 1.1 // When this changes, the persisted data will be discarded and the store reinitialized (Useful for migrations)
      }
    )
  )
)
export const resetAllSlices = () => resetters.forEach((reset) => reset())
