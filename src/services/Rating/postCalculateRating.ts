import { LearningElementRating, StudentRating } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * # postCalculateRating serivce
 *
 * Post a request to calculate new ratings of the student and the learning element.
 *
 * @param userId - The id of the user
 * @param courseId - The id of the course
 * @param topicId - The id of the topic
 * @param learningElementId - The id of the learning element
 *
 * @remarks
 * Return an object containing the new rating of the student and the learning element.
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
