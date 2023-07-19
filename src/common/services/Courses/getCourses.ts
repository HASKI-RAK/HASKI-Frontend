import { CourseReturn } from '@core'
import { getData } from '../RequestResponse'
import { CourseResponse } from '../../core/Course/Course'

export const getCourses: CourseReturn = async (userId?: number, lmsUserId?: number, studentId?: number) => {
  const response = await fetch(process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<CourseResponse>(response)
}
