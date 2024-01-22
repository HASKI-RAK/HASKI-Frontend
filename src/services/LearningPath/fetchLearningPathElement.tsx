import { LearningPathElement, LearningPathElementReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * Fetches all learning elements for a student for a course and topic
  * @param {string} userId - user id
  * @param {string} lmsUserId - lms user id
  * @param {string} studentId - student id
  * @param {string} course_id - course id
  * @param {string} topic_id - topic id
  * @returns {Promise<LearningPathElement[]>} - returns a promise with all learning
  * elements for a course and topic
  * @throws {Error} - throws an error if course_id or topic_id are not provided
  * @category Services
 */

export const fetchLearningPathElement: LearningPathElementReturn = async (
  userId,
  lmsUserId,
  studentId,
  course_id,
  topic_id
) => {
  if (!course_id || !topic_id) {
    throw new Error('course_id and topic_id are required')
  }
  return fetchData<LearningPathElement>(
    getConfig().BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic/${topic_id}/learningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
