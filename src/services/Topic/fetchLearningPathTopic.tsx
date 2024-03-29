import { LearningPathTopic, LearningPathTopicReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLearningPathTopic: LearningPathTopicReturn = async (userId, lmsUserId, studentId, courseId) => {
  if (!courseId) {
    throw new Error('courseId is required')
  }
  return fetchData<LearningPathTopic>(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
