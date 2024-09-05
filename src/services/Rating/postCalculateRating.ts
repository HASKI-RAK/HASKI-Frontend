import { LearningElementRating, StudentRating } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postCalculateRating = async (
  userId?: number,
  courseId?: string,
  topicId?: string,
  learningElementId?: number
): Promise<{
  studentRating: StudentRating
  learningElementRating: LearningElementRating
}> => {
  return fetchData<{
    studentRating: StudentRating
    learningElementRating: LearningElementRating
  }>(
    getConfig().BACKEND +
      `/user/${userId}/course/${courseId}/topic/${topicId}/learningElement/${learningElementId}/rating`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
