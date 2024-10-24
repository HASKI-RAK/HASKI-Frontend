import { StudentRating, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * # fetchStudentRatings service
 *
 * Fetches all student ratings from the backend.
 *
 * @remarks
 * Returns an empty array, if there are no ratings present.
 */
export const fetchStudentRatings: StudentRatingReturn = async (userId?: number, studentId?: number) => {
  if (!userId || !studentId) {
    throw new Error('userId and studentId are required')
  }

  return fetchData<StudentRating[]>(getConfig().BACKEND + `/user/${userId}/student/${studentId}/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
