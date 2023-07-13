import { LearningPathLearningElement } from '@core'

/**
 * Params are optional so
 *
 * @param userId The user's id
 * @param lmsUserId The user's lms id
 * @param studentId The user's student id
 * @param courseId The course's id
 * @param topicId The topic's id
 * @returns The learning path for the given user, course and topic
 */

type LearningPathElement = {
  id: number
  course_id: number
  based_on: string
  calculated_on: string
  path: LearningPathLearningElement[]
}

export default LearningPathElement
export type { LearningPathElementReturn }
