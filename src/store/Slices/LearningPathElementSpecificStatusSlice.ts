import {
  LearningPathElementSpecificStatusReturn,
  LearningPathElementStatus,
  LearningPathElementStatusReturn
} from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { resetters } from '../Zustand/Store'
import { fetchLearningPathElementSpecificStatus } from '@services'

export default interface LearningPathElementSpecificStatusSlice {
  _learningPathElementSpecificStatus: Record<string, LearningPathElementStatus[]>
  getLearningPathElementSpecificStatus: LearningPathElementSpecificStatusReturn
}

export const createLearningPathElementSpecificStatusSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningPathElementSpecificStatusSlice
> = (set, get) => {
  resetters.push(() => set({ _learningPathElementSpecificStatus: {} }))
  return {
    _learningPathElementSpecificStatus: {},
    getLearningPathElementSpecificStatus: async (...arg) => {
      const [courseId, studentId, learningElementId] = arg

        const learningPathElementSpecificStatusResponse = await fetchLearningPathElementSpecificStatus(
          courseId,
          studentId,
          learningElementId
        )

        return learningPathElementSpecificStatusResponse

    }
  }
}
