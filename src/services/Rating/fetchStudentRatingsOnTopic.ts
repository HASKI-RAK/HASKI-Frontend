import { StudentRatingResponse, StudentRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchStudentRatingsOnTopic: StudentRatingReturn = async (studentId?: number, topicId?: number) => {
  if (!studentId || !topicId) {
    throw new Error('studentId and topicId are required')
  }

  return fetchData<StudentRatingResponse>(getConfig().BACKEND + `/student/${studentId}/topic/${topicId}/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
