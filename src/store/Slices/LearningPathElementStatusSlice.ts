import { StateCreator } from 'zustand'
import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchLearningPathElementStatus } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

/*
 * getLearningPathElementStatus
 * @param courseId The course id
 * @param studentId The student id
 * @returns An array of learning path element statuses
 *
 * setLearningPathElementStatus
 * @param courseId The course id
 * @param studentId The student id
 * @param newData The new data to set (just 1 element)
 * @returns An array of learning path element statuses with the updated state
 *
 * @interface
 */
export default interface LearningPathElementStatusSlice {
  _learningPathElementStatus: Record<string, LearningPathElementStatus[]>
  ignoreLearningPathElementStatusCache: boolean
  triggerLearningPathElementStatusReload: (reloadState: boolean) => void
  getLearningPathElementStatus: LearningPathElementStatusReturn
  setLearningPathElementStatus: (
    courseId?: string,
    studentId?: number,
    newData?: LearningPathElementStatus
  ) => Promise<LearningPathElementStatus[]>
}

/*
 * getLearningPathElementStatus - Fetches all learning path element statuses
 * for a given course and student from the backend
 *
 * setLearningPathElementStatus - Set the learning path element status for a given
 * course and student
 */
export const createLearningPathElementStatusSlice: StateCreator<
  PersistedStoreState,
  [],
  [],
  LearningPathElementStatusSlice
> = (set, get) => {
  resetters.push(() => set({ _learningPathElementStatus: {} }))
  return {
    _learningPathElementStatus: {},
    ignoreLearningPathElementStatusCache: false,
    getLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId] = arg

      const { ignoreLearningPathElementStatusCache } = get()
      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]

      if (!cached || ignoreLearningPathElementStatusCache) {
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(courseId, studentId)
        set({
          _learningPathElementStatus: {
            ...get()._learningPathElementStatus,
            [`${courseId}-${studentId}`]: learningPathElementStatusResponse
          },
          ignoreLearningPathElementStatusCache: false
        })
        return learningPathElementStatusResponse
      } else return cached
    },
    setLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId, newData] = arg

      // If the data is not cached, fetch it from the backend
      if (get()._learningPathElementStatus[`${courseId}-${studentId}`] === undefined) {
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(courseId, studentId)
        set({
          _learningPathElementStatus: {
            ...get()._learningPathElementStatus,
            [`${courseId}-${studentId}`]: learningPathElementStatusResponse
          }
        })
      }

      // Get the cached data and convert it to an array if it is not already
      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]
      const cachedArray = Array.isArray(cached) ? cached : [cached]

      if (!newData) return cachedArray

      const index = cachedArray.findIndex((item) => item.cmid === newData.cmid)

      if (index !== -1) {
        // Create a new array with the updated state at the specified index
        const updatedState = [
          ...cachedArray.slice(0, index),
          {
            cmid: newData.cmid,
            state: newData.state,
            timecompleted: newData.timecompleted
          },
          ...cachedArray.slice(index + 1)
        ]

        set((state) => ({
          _learningPathElementStatus: {
            ...state._learningPathElementStatus,
            [`${courseId}-${studentId}`]: updatedState
          }
        }))

        return updatedState
      }

      set((state) => ({
        _learningPathElementStatus: {
          ...state._learningPathElementStatus,
          [`${courseId}-${studentId}`]: cachedArray
        }
      }))
      return cachedArray
    },
    triggerLearningPathElementStatusReload: (reloadState: boolean) =>
      set({ ignoreLearningPathElementStatusCache: reloadState })
  }
}
