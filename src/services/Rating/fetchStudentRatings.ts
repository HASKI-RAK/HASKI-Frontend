import { StudentRating, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * Sends a GET request to fetch all student ratings from the backend.
 *
 * This service function sends an HTTP request to retrieve all student ratings from the database using the backend API.
 * Returns an empty array if no ratings are present.
 *
 * @param userId - The ID of the user.
 * @param studentId - The ID of the student.
 *
 * @category Services
 *
 * @example
 * ```ts
 * const studentRatings = await fetchStudentRatings(1, 1)
 * ```
 */
export const fetchStudentRatings: StudentRatingReturn = async (userId: number, studentId: number) => {
  return fetchData<StudentRating[]>(getConfig().BACKEND + `/user/${userId}/student/${studentId}/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
