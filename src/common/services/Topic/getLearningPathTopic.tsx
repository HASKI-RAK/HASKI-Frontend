import { LearningPathTopic } from '@core'
import { getData } from '../RequestResponse'

/**
 * @typedef {Object} LearningPathTopicProps
 * @property {number} userId
 * @property {number} lmsUserId
 * @property {number} studentId
 * @property {string} courseId
 */
type LearningPathTopicProps = {
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: string
}

/**
 * Returns the {@link LearningPathTopic} for the given {@link LearningPathTopicProps}
 * @module
 * @name getLearningPathTopic
 * @param {LearningPathTopicProps} props 
 * @returns {Promise<LearningPathTopic>}
 */
export const getLearningPathTopic = async (props: LearningPathTopicProps) => {
  const { userId, lmsUserId, studentId, courseId } = props
  if (!courseId) {
    throw new Error('course_id is required')
  }
  const response = await fetch(
    process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return getData<LearningPathTopic>(response)
}
