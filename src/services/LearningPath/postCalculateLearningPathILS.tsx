import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { LearningPathBasedOn } from '@core'
import learningPathBasedOn from '../../core/CalculateLearningPath/LearningPathBasedOn'

/*
  * postCalculateLearningPathILS function.
  *
  
  * @param userId - user id
  * @param lmsUserId - lms user id
  * @param studentId - student id
  * @param courseId - course id
  * @param topicId - topic id
  * @param algorithm - algorithm to use, can be: "graf", "aco", "ga"
  *
  * @remarks
  * Sends a request to the backend to calculate the learning path for a student for a course.
  * Throws an error if userId, lmsUserId, studentId, courseId, topicId or algorithm are not provided.
  *
  * @returns - returns a promise with the learning path
  *
  * @category Services
 */
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
