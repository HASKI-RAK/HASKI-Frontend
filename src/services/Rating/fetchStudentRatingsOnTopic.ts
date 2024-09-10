import { StudentRating, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * # fetchStudentRatingsOnTopic service
 *
 * Fetches all student ratings associated with the student and topic from the backend.
 *
 * @param studentId - The id of the student
 * @param topicId  - The id of the topic
 *
 * @remarks
 * Returns an empty array, if there are no ratings present.
 * Throws an error if either studentId or topicId is empty.
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
