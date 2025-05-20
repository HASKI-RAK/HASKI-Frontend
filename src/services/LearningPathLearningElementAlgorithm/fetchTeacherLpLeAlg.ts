import { TeacherLpLeAlgorithm, TeacherLpLeAlgorithmReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/**
 * fetchTeacherLpLeAlg function.
 *
 * @param topicId - The topic id
 *
 * @remarks
 * Fetches the learning path algorithm the teacher has chosen for a topic
 *
 * @returns - Object with id,topic_id and algorithm_id
 *
 * @category Services
 */

export const fetchTeacherLpLeAlg: TeacherLpLeAlgorithmReturn = async (topicId?: number) => {
  return fetchData<TeacherLpLeAlgorithm>(getConfig().BACKEND + `/topic/${topicId}/teacherAlgorithm`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
