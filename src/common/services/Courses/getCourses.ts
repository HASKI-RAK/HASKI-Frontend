import { Course } from '@core'
import { getData } from '../RequestResponse'

export const getCourses = async (userId: number, lmsUserId: number, studentId: number) => {
  const response = await fetch(process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return getData<Course[]>(response)
}
