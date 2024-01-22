import { CourseReturn, CourseResponse } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * Fetches the courses for the given user
  * @param userId The user's id
  * @param lmsUserId The user's lms id
  * @param studentId The user's student id
  * @returns The courses for the given user
  * @category Services
 */

export const fetchCourses: CourseReturn = async (userId?: number, lmsUserId?: number, studentId?: number) => {
  return fetchData<CourseResponse>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
