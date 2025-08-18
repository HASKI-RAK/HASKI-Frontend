import { LearningElementRating, StudentRating } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a POST request to calculate new ratings in the backend.
 *
 * This service function sends an HTTP request to calculate a new student and learning element rating
 * using the backend API.
 *
 * @param userId - The ID of the user.
 * @param courseId - The ID of the course.
 * @param topicId - The ID of the topic.
 * @param learningElementId - The ID of the learning element.
 * @returns An object containing the new rating of the student and learning element.
 *
 * @category Services
 *
 * @example
 * ```ts
 * const { studentRating, learningElementRating } = await postCalculateRating(userId, courseId, topicId, learningElementId)
 * ```
 */
export const postCalculateRating = async (
  userId?: number,
  courseId?: string,
  topicId?: string,
  learningElementId?: number
): Promise<{
  studentRating: StudentRating
  learningElementRating: LearningElementRating
}> => {
  return fetchData<{
    studentRating: StudentRating
    learningElementRating: LearningElementRating
  }>(
    getConfig().BACKEND +
      `/user/${userId}/course/${courseId}/topic/${topicId}/learningElement/${learningElementId}/rating`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
