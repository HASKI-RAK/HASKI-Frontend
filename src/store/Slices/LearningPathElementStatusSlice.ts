import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'
import { fetchLearningPathElementStatus } from '@services'

export default interface LearningPathElementStatusSlice {
  _learningPathElementStatus: Record<string, LearningPathElementStatus[]>
  getLearningPathElementStatus: LearningPathElementStatusReturn
  setLearningPathElementStatus: (courseId: string, studentId: number, newData: LearningPathElementStatus) => void
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

      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]
      const index = cached.findIndex((item) => item.cmid === newData.cmid)
      console.log(newData.cmid)

      if (index !== -1) {
        // Create a new array with the updated state at the specified index
        const updatedState = [...cached]
        updatedState[index] = {
          cmid: newData.cmid,
          state: newData.state,
          timecompleted: newData.timecompleted
        }
        console.log(updatedState)

        set((state) => ({
          _learningPathElementStatus: {
            ...state._learningPathElementStatus,
            [`${courseId}-${studentId}`]: updatedState
          }
        }))

        return
      }

      set((state) => ({
        _learningPathElementStatus: {
          ...state._learningPathElementStatus,
          [`${courseId}-${studentId}`]: cached
        }
      }))
    }
  }
}
