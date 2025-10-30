import log from 'loglevel'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createLearningElementRecommendationSlice, LearningElementRecommendationSlice } from '../Slices'
import AuthSlice, { createAuthSlice } from '../Slices/AuthSlice'
import CourseSlice, { createCourseSlice } from '../Slices/CourseSlice'
import { CoursesSlice, createCoursesSlice } from '../Slices/CoursesSlice'
import { createDefaultLearningPathSlice, DefaultLearningPathSlice } from '../Slices/DefaultLearningPathSlice'
import { createExperiencePointsSlice, ExperiencePointsSlice } from '../Slices/ExperiencePointsSlice'
import { createILSSlice, ILSSlice } from '../Slices/ILSSlice'
import { createLearningPathElementSlice, LearningPathElementSlice } from '../Slices/LearningPathElementSlice'
import LearningPathElementSpecificStatusSlice, {
  createLearningPathElementSpecificStatusSlice
} from '../Slices/LearningPathElementSpecificStatusSlice'
import {
  createLearningPathElementStatusSlice,
  LearningPathElementStatusSlice
} from '../Slices/LearningPathElementStatusSlice'
import { createLearningPathTopicSlice, LearningPathTopicSlice } from '../Slices/LearningPathTopicSlice'
import { createNewsSlice, NewsSlice } from '../Slices/NewsSlice'
import { createRemoteTopicsSlice, RemoteTopicsSlice } from '../Slices/RemoteTopicsSlice'
import { createStudentLpLeAlgorithmSlice, StudentLpLeAlgorithmSlice } from '../Slices/StudentLpLeAlgSlice'
import { createTeacherLpLeAlgorithmSlice, TeacherLpLeAlgorithmSlice } from '../Slices/TeacherLpLeAlgorithmSlice'
import { createTopicBadgeSlice, TopicBadgeSlice } from '../Slices/TopicBadgeSlice'
import { createUserSlice, UserSlice } from '../Slices/UserSlice'

export type StoreState = LearningPathElementSlice &
  CourseSlice &
  CoursesSlice &
  ExperiencePointsSlice &
  LearningPathTopicSlice &
  LearningPathElementSpecificStatusSlice &
  RemoteTopicsSlice &
  TeacherLpLeAlgorithmSlice &
  StudentLpLeAlgorithmSlice &
  LearningElementRecommendationSlice &
  TopicBadgeSlice
export type PersistedStoreState = UserSlice &
  AuthSlice &
  LearningPathElementStatusSlice &
  DefaultLearningPathSlice &
  ILSSlice
export type SessionStoreState = NewsSlice

export const resetters: (() => void)[] = []

export const useStore = create<StoreState>()((...a) => ({
  ...createExperiencePointsSlice(...a),
  ...createLearningPathElementSlice(...a),
  ...createLearningPathTopicSlice(...a),
  ...createCourseSlice(...a),
  ...createCoursesSlice(...a),
  ...createLearningPathElementSpecificStatusSlice(...a),
  ...createRemoteTopicsSlice(...a),
  ...createTeacherLpLeAlgorithmSlice(...a),
  ...createStudentLpLeAlgorithmSlice(...a),
  ...createLearningElementRecommendationSlice(...a),
  ...createTopicBadgeSlice(...a)
}))

export const usePersistedStore = create<PersistedStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createLearningPathElementStatusSlice(...a),
        ...createAuthSlice(...a),
        ...createDefaultLearningPathSlice(...a),
        ...createILSSlice(...a)
      }),
      {
        name: 'persisted_storage',
        // Here we can whitelist the keys we want to persist
        partialize: (state) => ({
          _ils: state._ils,
          _user: state._user,
          _learningPathElementStatus: state._learningPathElementStatus,
          _defaultLearningPath: state._defaultLearningPath,
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
// This function is used to reset all slices of the store just for testing purposes
// sonarjs/no-empty-collection
export const resetAllSlices = () => resetters.forEach((reset) => reset())
