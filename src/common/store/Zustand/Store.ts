import create from 'zustand'
import LearningPathElementSlice, { createLearningPathElementSlice } from '../Slices/LearningPathElementSlice'
import UserSlice, { createUserSlice } from '../Slices/UserSlice'
import CourseSlice, { createCourseSlice } from '../Slices/CourseSlice'
import CoursesSlice, { createCoursesSlice } from '../Slices/CoursesSlice'
import LearningPathTopicSlice, { createLearningPathTopicSlice } from '../Slices/LearningPathTopicSlice'
import AuthSlice, { createAuthSlice } from '../Slices/AuthSlice'
import log from 'loglevel'
import { devtools, persist } from 'zustand/middleware'
import ILSSlice, {createILSSlice} from "../Slices/QuestionnaireILS";
import ListKSlice, {createListKSlice} from "../Slices/QuestionnaireListK";

export type StoreState = LearningPathElementSlice & CourseSlice & CoursesSlice & LearningPathTopicSlice & ILSSlice & ListKSlice
export type PersistedStoreState = UserSlice & AuthSlice

export const resetters: (() => void)[] = []

export const useStore = create<StoreState>()((...a) => ({
  ...createLearningPathElementSlice(...a),
  ...createLearningPathTopicSlice(...a),
  ...createCourseSlice(...a),
  ...createCoursesSlice(...a),
  ...createILSSlice(...a),
  ...createListKSlice(...a)
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
        version: 1.1 // When this changes, the persisted data will be discarded and the store reinitialized (Useful for migrations)
      }
    )
  )
)
export const resetAllSlices = () => resetters.forEach((reset) => reset())
