import { RemoteCourse } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchRemoteCourses = async () => {
  return fetchData<RemoteCourse[]>(getConfig().BACKEND + `/lms/remote/courses`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
