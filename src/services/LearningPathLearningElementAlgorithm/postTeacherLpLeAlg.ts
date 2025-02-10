import { TeacherLpLeAlgorithm } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * postTeacherLpLeAlg function.
 *
 * @param userId - user id
 * @param lmsUserId - lms user id
 * @param topicId - topic id
 * @param algorithm_s_name - algorithm to use, can be: "default", "aco", "graf", "tyche", "nestor"
 * @remarks
 * Sends a request to the backend to change the learning path algorithm for a topic by a teacher.
 *
 *
 * @returns - returns a promise with the learning path
 *
 * @category Services
 */

export const postTeacherLpLeAlg = async (
  userId?: number,
  lmsUserId?: number,
  topicId?: number,
  algorithm_s_name?: string
): Promise<TeacherLpLeAlgorithm> => {
  return fetchData<TeacherLpLeAlgorithm>(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/topic/${topicId}/teacherAlgorithm`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ algorithm_short_name: algorithm_s_name })
    }
  )
}
