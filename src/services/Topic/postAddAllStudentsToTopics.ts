import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * postAddAllStudentsToTopics function.
 *
 * @returns - The HTTP Status
 *
 * @category Services
 */

export const postAddAllStudentsToTopics = async (courseId: string) => {
  return fetchData<Response>(getConfig().BACKEND + `/course/${courseId}/topics/allStudents`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
