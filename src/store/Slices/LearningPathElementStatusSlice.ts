import { LearningPathElementStatus, LearningPathElementStatusReturn } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'
import { fetchLearningPathElementStatus } from '@services'

export default interface LearningPathElementStatusSlice {
  _learningPathElementStatus: Record<string, LearningPathElementStatus>
  getLearningPathElementStatus: LearningPathElementStatusReturn
}

export const createLearningPathElementStatusSlice: StateCreator<PersistedStoreState, [], [], LearningPathElementStatusSlice> = (set, get) => {
  resetters.push(() => set({ _learningPathElementStatus: {} }))
  return {
    _learningPathElementStatus: {},
    getLearningPathElementStatus: async (...arg) => {
      const [courseId, studentId] = arg

      const cached = get()._learningPathElementStatus[`${courseId}-${studentId}`]

      if (!cached) {
        const learningPathElementStatusResponse = await fetchLearningPathElementStatus(
          courseId,
          studentId
        )
        set({ _learningPathElementStatus: {
          ...get()._learningPathElementStatus,
          [`${courseId}-${studentId}`]: learningPathElementStatusResponse
          } })
        return learningPathElementStatusResponse
      } else return cached
    }
  }
}
