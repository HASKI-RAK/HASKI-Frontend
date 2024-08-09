import { TeacherLpLeAlgorithmResponse, TeacherLpLeAlgorithmReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * fetchTeacherLpLeAlg function.
 *
 * @param userId - The user's id
 * @param topicId - The topic id
 *
 * @remarks
 * Fetches the learning path algorithm the teacher has chosen for a topic
 *
 * @returns - Object with id,topic_id and algorithm_id
 *
 * @category Services
 */

export const fetchTeacherLpLeAlg: TeacherLpLeAlgorithmReturn = async (userId?: number, topicId?: number) => {
  return fetchData<TeacherLpLeAlgorithmResponse>(
    getConfig().BACKEND + `/user/${userId}/topic/${topicId}/teacherAlgorithm`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
