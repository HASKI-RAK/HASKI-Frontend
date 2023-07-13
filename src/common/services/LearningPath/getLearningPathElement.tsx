import { LearningPathElement } from '@core'
import { getData } from '../RequestResponse'

/**
 * @typedef {Object} LearningPathTopicProps
 * @property {number} userId
 * @property {number} lmsUserId
 * @property {number} studentId
 * @property {string} courseId
 * @property {string} topicId
 */
type LearningPathElementProps = {
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: string,
  topicId?: string
}

/**
 * Returns the {@link LearningPathElement} for the given {@link LearningPathElementProps}
 * @module
 * @name getLearningPathElement
 * @param {LearningPathElementProps} props 
 * @returns {Promise<LearningPathElement>}
 */
export const getLearningPathElement = async (props: LearningPathElementProps) => {
  const { userId, lmsUserId, studentId, courseId, topicId } = props
  if (!courseId || !topicId) {
    throw new Error('course_id and topic_id are required')
  }
  const response = await fetch(
    process.env.BACKEND +
    `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic/${topicId}/learningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return getData<LearningPathElement>(response)
}
