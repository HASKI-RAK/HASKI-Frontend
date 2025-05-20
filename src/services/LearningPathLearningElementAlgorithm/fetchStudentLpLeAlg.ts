import { StudentLpLeAlgorithm, StudentLpLeAlgorithmReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/**
 * fetchStudentLpLeAlg function.
 *
 * @param userId - The user's id
 * @param topicId - The topic id
 *
 * @remarks
 * Fetches the learning path algorithm a student has chosen for a topic
 *
 * @returns - Object with id, student_id, topic_id and algorithm_id
 *
 * @category Services
 */

export const fetchStudentLpLeAlg: StudentLpLeAlgorithmReturn = async (userId?: number, topicId?: number) => {
  return fetchData<StudentLpLeAlgorithm>(getConfig().BACKEND + `/user/${userId}/topic/${topicId}/studentAlgorithm`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
