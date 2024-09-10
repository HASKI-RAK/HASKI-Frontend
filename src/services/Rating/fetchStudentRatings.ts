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
export const fetchStudentRatings: StudentRatingReturn = async () => {
  return fetchData<StudentRating[]>(getConfig().BACKEND + `/student/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
