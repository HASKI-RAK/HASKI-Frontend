import { LearningPathElement, LearningPathElementReturn } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

export const getLearningPathElement: LearningPathElementReturn = async (
  userId,
  lmsUserId,
  studentId,
  course_id,
  topic_id
) => {
  if (!course_id || !topic_id) {
    throw new Error('course_id and topic_id are required')
  }
  const response = await fetch(
    getConfig().BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic/${topic_id}/learningPath`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return getData<LearningPathElement>(response)
}
