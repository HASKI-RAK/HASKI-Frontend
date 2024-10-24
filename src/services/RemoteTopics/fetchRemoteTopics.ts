import { getConfig } from '@shared'
import RemoteTopic, { RemoteTopicReturn } from '../../core/RemoteTopic/RemoteTopic'
import { fetchData } from '../RequestResponse'

/*
 * fetchRemoteTopics function.
 *
 * @returns - The remote topics and learning eleemnts array from LMS
 *
 * @category Services
 */
export const fetchRemoteTopics: RemoteTopicReturn = async (courseId?: string) => {
  return fetchData<RemoteTopic[]>(getConfig().BACKEND + `/lms/remote/course/${courseId}/content`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
