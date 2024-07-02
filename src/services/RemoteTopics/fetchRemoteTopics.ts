import { RemoteCourse } from '@core'
import { getConfig } from '@shared'
import RemoteTopic from '../../core/RemoteTopic/RemoteTopic'
import { fetchData } from '../RequestResponse'

export const fetchRemoteTopics = async (courseId: number) => {
  return fetchData<RemoteTopic[]>(getConfig().BACKEND + `/lms/remote/course/${courseId}/content`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
