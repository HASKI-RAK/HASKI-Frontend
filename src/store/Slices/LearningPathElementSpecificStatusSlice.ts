import { StateCreator } from 'zustand'

import { LearningPathElementStatusReturn } from '@core'
import { fetchLearningPathElementSpecificStatus } from '@services'
import { StoreState } from '@store'

/*
 * @prop courseId - The course id
 * @prop studentId - The student id
 * @prop learningElementId - The learning element id (in Moodle)
 *
 * @remarks
 * getLearningPathElementSpecificStatus - Fetches a specific learning element status
 * status for a student in a course from the backend and returns
 * Promise<LearningPathElementStatus[]>
 *
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
