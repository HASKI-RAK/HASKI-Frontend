import { CourseReturn, CourseResponse } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

export const getCourses: CourseReturn = async (userId?: number, lmsUserId?: number, studentId?: number) => {
  const response = await fetch(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<CourseResponse>(response)
}
