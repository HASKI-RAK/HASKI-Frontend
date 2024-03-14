import { LearningPathElement, LearningPathElementReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchLearningPathElement function.
 *
 * @param userId - user id
 * @param lmsUserId - lms user id
 * @param studentId - student id
 * @param courseId - course id
 * @param topicId - topic id
 *
 * @remarks
 * Fetches all learning elements for a student for a course and topic.
 * Throws an error if courseId or topicId are not provided elements for a course and topic.
 *
 * @returns - returns a promise with all learning
 *
 * @category Services
 */

export const fetchLearningPathElement: LearningPathElementReturn = async (
  userId,
  lmsUserId,
  studentId,
  courseId,
  topicId
) => {
  if (!courseId || !topicId) {
    throw new Error('courseId and topicId are required')
  }
  return fetchData<LearningPathElement>(
    getConfig().BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic/${topicId}/learningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
