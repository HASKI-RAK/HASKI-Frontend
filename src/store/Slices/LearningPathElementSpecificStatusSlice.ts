import {
  LearningPathElementStatus,
  LearningPathElementStatusReturn
} from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { fetchLearningPathElementSpecificStatus } from '@services'

export default interface LearningPathElementSpecificStatusSlice {
  _learningPathElementSpecificStatus: Record<string, LearningPathElementStatus[]>
  getLearningPathElementSpecificStatus: LearningPathElementStatusReturn
}

export const createLearningPathElementSpecificStatusSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningPathElementSpecificStatusSlice
> = () => {
  return {
    _learningPathElementSpecificStatus: {},
    getLearningPathElementSpecificStatus: async (...arg) => {
      const [courseId, studentId, learningElementId] = arg

      return await fetchLearningPathElementSpecificStatus(
          courseId,
          studentId,
          learningElementId
      )
    }
  }
}
