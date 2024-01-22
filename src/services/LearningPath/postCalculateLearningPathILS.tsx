import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { LearningPathBasedOn } from '@core'
import learningPathBasedOn from '../../core/CalculateLearningPath/LearningPathBasedOn'

/*
  * Sends a request to the backend to calculate the learning path for a student for a course
  * @param {number} userId - user id
  * @param {number} lmsUserId - lms user id
  * @param {number} studentId - student id
  * @param {number} courseId - course id
  * @param {number} topicId - topic id
  * @param {string} algorithm - algorithm to use, can be: "graf", "aco", "ga"
  * @returns {Promise<LearningPathBasedOn>} - returns a promise with the learning path
  * @throws {Error} - throws an error if userId, lmsUserId, studentId, courseId, topicId or algorithm are not provided
  * @category Services
 */

//
export const postCalculateLearningPathILS = async (
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: number,
  topicId?: number,
  algorithm?: string
): Promise<LearningPathBasedOn> => {
  return fetchData<learningPathBasedOn>(
    getConfig().BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic/${topicId}/learningPath`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ algorithm: algorithm })
    }
  )
}
