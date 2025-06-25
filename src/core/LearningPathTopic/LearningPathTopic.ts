import Topic from '../Topic/Topic'

/**
 * Params are optional so
 *
 * @param userId The user's id
 * @param lmsUserId The user's lms id
 * @param studentId The user's student id
 * @param courseId The course's id
 * @returns The learning path topics for the given user and course
 */

type LearningPathTopicReturn = (
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: string
) => Promise<LearningPathTopic>

type LearningPathTopic = {
  topics: Topic[]
}

export default LearningPathTopic
export type { LearningPathTopicReturn }
