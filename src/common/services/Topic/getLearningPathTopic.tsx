import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { getData } from '../RequestResponse'

export const getLearningPathTopic: LearningPathTopicReturn = async (userId, lmsUserId, studentId, course_id) => {
  if (!course_id) {
    throw new Error('course_id is required')
  }
  const response = await fetch(
    process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return getData<LearningPathTopic>(response)
}
