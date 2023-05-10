import { LearningPath, LearningPathReturn } from '@core'

export const getLearingPath: LearningPathReturn = async (userId, lmsUserId, studentId, course_id, topic_id) => {
  if (!course_id || !topic_id) {
    throw new Error('course_id and topic_id are required')
  }
  return fetch(
    process.env.BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic/${topic_id}/learningPath`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    return response.json()
  }) as Promise<LearningPath>
}
