import { StudentRating, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to fetch all student ratings corresponding to a specific student and topic from the backend.
 *
 * This service functions sends an HTTP request to retrieve all student ratings associated
 * with a specific student ID and topic ID from the database using the backend API.
 * Returns an empty array if no ratings are present.
 *
 * @param studentId - The id of the student.
 * @param topicId - The id of the topic.
 *
 * @category Services
 *
 * @throws If either studentId or topicId is not provided.
 *
 * @example
 * ```ts
 * const studentRatings = await fetchStudentRatingsOnTopic(studentId, topicId)
 * ```
 */
export const fetchStudentRatingsOnTopic: StudentRatingReturn = async (studentId?: number, topicId?: number) => {
  if (!studentId || !topicId) {
    throw new Error('studentId and topicId are required')
  }

  return fetchData<StudentRating[]>(getConfig().BACKEND + `/student/${studentId}/topic/${topicId}/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
