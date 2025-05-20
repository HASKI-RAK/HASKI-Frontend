import { RemoteTopics, RemoteTopicsReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/*
 * fetchRemoteTopics function.
 *
 * @returns - The remote topics and learning elements array from LMS
 *
 * @category Services
 */
export const fetchRemoteTopics: RemoteTopicsReturn = async (courseId?) => {
  if (!courseId) {
    throw new Error('courseId is required')
  }
  return fetchData<RemoteTopics[]>(getConfig().BACKEND + `/lms/remote/course/${courseId}/content`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
