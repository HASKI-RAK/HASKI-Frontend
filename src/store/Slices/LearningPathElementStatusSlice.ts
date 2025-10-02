import { StateCreator } from 'zustand'
import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { fetchLearningPathElementStatus } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

type LearningPathElementStatusCache = {
  value?: LearningPathElementStatus[]
  promise?: Promise<LearningPathElementStatus[]>
}

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
export type LearningPathElementStatusSlice = {
  _learningPathElementStatus: Record<string, LearningPathElementStatusCache>
  clearLearningPathElementStatusCache: () => void
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
    clearLearningPathElementStatusCache: () => {
      set({ _learningPathElementStatus: {} })
    },
    getLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId] = arg
      const key = `${courseId}-${studentId}`

      const cached = get()._learningPathElementStatus[key]

      if (cached?.value) {
        return cached.value
      }

      if (cached?.promise) {
        // If we have a promise, wait for it to resolve
        return cached.promise
      }

      const fetchPromise = fetchLearningPathElementStatus(courseId, studentId).then(
        (response: LearningPathElementStatus[]) => {
          // Once resolved, cache the value and remove the in-flight promise.
          set({
            _learningPathElementStatus: {
              ...get()._learningPathElementStatus,
              [key]: { value: response }
            }
          })
          return response
        }
      )

      // Cache the in-flight promise.
      set({
        _learningPathElementStatus: {
          ...get()._learningPathElementStatus,
          [key]: { promise: fetchPromise }
        }
      })
      return fetchPromise
    },
    setLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId, newData] = arg
      const key = `${courseId}-${studentId}`

      // If the data is not cached, fetch it from the backend
      if (!get()._learningPathElementStatus[key]?.value) {
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(courseId, studentId)
        set({
          _learningPathElementStatus: {
            ...get()._learningPathElementStatus,
            [key]: { value: learningPathElementStatusResponse }
          }
        })
      }

      // Get the cached data and convert it to an array if it is not already
      const cached = get()._learningPathElementStatus[key]?.value
      const cachedArray = Array.isArray(cached) ? cached : cached ? [cached] : []

      if (!newData) return cachedArray

      const index = cachedArray.findIndex((item) => item.cmid === newData.cmid)

      if (index !== -1) {
        // Create a new array with the updated state at the specified index
        const updatedState = [
          ...cachedArray.slice(0, index),
          { cmid: newData.cmid, state: newData.state, timecompleted: newData.timecompleted },
          ...cachedArray.slice(index + 1)
        ]

        set((state) => ({
          _learningPathElementStatus: {
            ...state._learningPathElementStatus,
            [key]: { value: updatedState }
          }
        }))

        return updatedState
      }

      set((state) => ({
        _learningPathElementStatus: {
          ...state._learningPathElementStatus,
          [key]: { value: cachedArray }
        }
      }))
      return cachedArray
    }
  }
}
