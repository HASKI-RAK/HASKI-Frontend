import { CourseResponse, CourseReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * fetchCourses function.
 *
 * @param userId - The user's id
 * @param lmsUserId - The user's lms id
 * @param studentId - The user's student id
 *
 * @remarks
 * Fetches the courses for the given user
 *
 * @returns - The courses for the given user
 *
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
