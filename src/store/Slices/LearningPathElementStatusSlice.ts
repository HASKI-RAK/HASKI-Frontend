import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'
import { fetchLearningPathElementStatus } from '@services'

export default interface LearningPathElementStatusSlice {
  _learningPathElementStatus: Record<string, LearningPathElementStatus[]>
  getLearningPathElementStatus: LearningPathElementStatusReturn
  setLearningPathElementStatus: (courseId?: string, studentId?: number, newData?: LearningPathElementStatus) => Promise<LearningPathElementStatus[]>
}

export const createLearningPathElementStatusSlice: StateCreator<
  PersistedStoreState,
  [],
  [],
  LearningPathElementStatusSlice
> = (set, get) => {
  resetters.push(() => set({ _learningPathElementStatus: {} }))
  return {
    _learningPathElementStatus: {},
    getLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId] = arg

      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]

      if (!cached) {
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(courseId, studentId)
        set({
          _learningPathElementStatus: {
            ...get()._learningPathElementStatus,
            [`${courseId}-${studentId}`]: learningPathElementStatusResponse
          }
        })
        return learningPathElementStatusResponse
      } else return cached
    },
    setLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId, newData] = arg

      if(get()._learningPathElementStatus[`${courseId}-${studentId}`] === undefined){
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(courseId, studentId)
        set({
          _learningPathElementStatus: {
            ...get()._learningPathElementStatus,
            [`${courseId}-${studentId}`]: learningPathElementStatusResponse
          }
        })
      }


      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]
      const cachedArray = Array.isArray(cached) ? cached : [cached]

      if(!newData) return cachedArray

      const index = cachedArray.findIndex((item) => item.cmid === newData.cmid)

      if (index !== -1) {
        // Create a new array with the updated state at the specified index
        const updatedState = [
          ...cachedArray.slice(0, index),
          {
            cmid: newData.cmid,
            state: newData.state,
            timecompleted: newData.timecompleted,
          },
          ...cachedArray.slice(index + 1),
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
    }
  }
}
