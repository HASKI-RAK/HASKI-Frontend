import { LearningPathElementStatusReturn } from '@core'
import { StateCreator } from 'zustand'
import { StoreState } from '@store'
import { fetchLearningPathElementSpecificStatus } from '@services'

/*
 * @prop courseId - The course id
 * @prop studentId - The student id
 * @prop learningElementId - The learning element id (in Moodle)
 *
 * @remarks
 * get - Fetches a specific learning path element status
 *
 * @interface
 */
type LearningPathElementSpecificStatusSlice = {
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

      return await fetchLearningPathElementSpecificStatus(courseId, studentId, learningElementId)
    }
  }
}

export default LearningPathElementSpecificStatusSlice
