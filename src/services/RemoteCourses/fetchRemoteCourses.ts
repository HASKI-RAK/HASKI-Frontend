import { RemoteCourse } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * fetchRemoteCourses function.
 *
 * @returns - The remote courses array from LMS
 *
 * @category Services
 */
export const fetchRemoteCourses = async () => {
  return fetchData<RemoteCourse[]>(getConfig().BACKEND + `/lms/remote/courses`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
