import {
  LearningPathElementStatusReturn
} from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { fetchLearningPathElementSpecificStatus } from '@services'

export default interface LearningPathElementSpecificStatusSlice {
  getLearningPathElementSpecificStatus: LearningPathElementStatusReturn
}

export const createLearningPathElementSpecificStatusSlice: StateCreator<
  StoreState,
  [],
  [],
  LearningPathElementSpecificStatusSlice
> = () => {
  return {
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
