import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchLearningPathTopic: LearningPathTopicReturn = async (userId, lmsUserId, studentId, course_id) => {
  if (!course_id) {
    throw new Error('course_id is required')
  }
  const response = await fetch(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic`,
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
