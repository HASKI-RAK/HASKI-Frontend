import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { LearningPathBasedOn } from '@core'
import learningPathBasedOn from '../../core/CalculateLearningPath/LearningPathBasedOn'

//algorithm can be: "graf", "aco", "ga"
export const postCalculateLearningPathILS = async (
  userId?: number,
  lmsUserId?: number,
  studentId?: number,
  courseId?: number,
  topicId?: number,
  algorithm?: string
): Promise<LearningPathBasedOn> => {
  return fetchData<learningPathBasedOn>(
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
}
