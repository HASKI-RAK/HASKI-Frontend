import { getConfig } from '@shared'
import { getData } from '../RequestResponse'
import { LearningPathBasedOn } from '@core'

//algorithm can be: "graf", "aco", "ga"
export const postCalculateLearningPathILS = async (
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: number,
  topicId?: number,
  algorithm?: string
): Promise<LearningPathBasedOn> => {
  const response = await fetch(
    getConfig().BACKEND +
      `/user/${userId}/${lmsUserId}/student/${studentId}/course/${courseId}/topic/${topicId}/learningPath`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ algorithm: algorithm })
    }
  )

  return getData<LearningPathBasedOn>(response)
}
