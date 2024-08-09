import { StudentLpLeAlgorithm } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * postStudentLpLeAlg function.
 *
 * @param userId - user id
 * @param topicId - topic id
 * @param algorithm_s_name - algorithm to use, can be: "default", "aco", "graf", "tyche", "nestor"
 * @remarks
 * Sends a request to the backend change the learning path algorithm for a student for a topic.
 *
 *
 * @returns - returns a promise with the learning path
 *
 * @category Services
 */

export const postStudentLpLeAlg = async (
  userId?: number,
  topicId?: number,
  algorithm_s_name?: string
): Promise<StudentLpLeAlgorithm> => {
  return fetchData<StudentLpLeAlgorithm>(getConfig().BACKEND + `/user/${userId}/topic/${topicId}/algorithm`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ algorithm_s_name: algorithm_s_name })
  })
}
