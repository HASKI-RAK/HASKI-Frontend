import { LearningPathLearningElement } from '@core'

/**
 * Params are optional so
 *
 * @param user_id The user's id
 * @param lms_user_id The user's lms id
 * @param student_id The user's student id
 * @param course_id The course's id
 * @param topic_id The topic's id
 * @returns The learning path for the given user, course and topic
 */
type LearningPathReturn = (
  user_id?: number,
  lms_user_id?: number,
  student_id?: number,
  course_id?: number,
  topic_id?: number
) => Promise<LearningPath>

type LearningPath = {
  id: number
  course_id: number
  based_on: string
  calculated_on: string
  path: LearningPathLearningElement[]
}

export default LearningPath
export type { LearningPathReturn }
