import { CourseReturn, CourseResponse } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchCourses: CourseReturn = async (userId?: number, lmsUserId?: number, studentId?: number) => {
  return fetchData<CourseResponse>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
