import { LearningPathElement, LearningPathElementReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * fetchLearningPathElement function.
  *
  * @param userId - user id
  * @param lmsUserId - lms user id
  * @param studentId - student id
  * @param course_id - course id
  * @param topic_id - topic id
  *
  * @remarks
  * Fetches all learning elements for a student for a course and topic.
  * Throws an error if course_id or topic_id are not provided elements for a course and topic.
  *
  * @returns - returns a promise with all learning
  *
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
