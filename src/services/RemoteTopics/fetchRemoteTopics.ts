import { getConfig } from '@shared'
import RemoteTopic, { RemoteTopicReturn } from '../../core/RemoteTopic/RemoteTopic'
import { fetchData } from '../RequestResponse'

export const fetchRemoteTopics: RemoteTopicReturn = async (courseId: number) => {
  return fetchData<RemoteTopic[]>(getConfig().BACKEND + `/lms/remote/course/${courseId}/content`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
