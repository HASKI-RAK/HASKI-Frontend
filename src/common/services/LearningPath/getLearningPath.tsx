import { LearningPath, LearningPathReturn } from '@core'

export const getLearningPath: LearningPathReturn = async (userId, lmsUserId, studentId, course_id, topic_id) => {
  return fetch(
    process.env.BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic/${topic_id}/learningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    if (response.ok) {
      return response.json().then((data: unknown) => {
        return data as LearningPath
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
