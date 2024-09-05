import { StudentRating, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchStudentRatings: StudentRatingReturn = async () => {
  return fetchData<StudentRating[]>(getConfig().BACKEND + `/student/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
