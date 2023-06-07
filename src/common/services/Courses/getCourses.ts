import { Course } from '@core'

export const getCourses = async (userId: number, lmsUserId: number, studentId: number) => {
  return fetch(process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        if ('courses' in data) return data['courses'] as Course[]
        else throw new Error('getCourses: No courses found')
      })
    } else {
      // If resposne has error variable, then throw error
      return response.json().then((data) => {
        if ('error' in data) {
          throw new Error(data['error'] + ' ' + data['message'])
        } else {
          throw new Error('Unknown error')
        }
      })
    }
  })
}
