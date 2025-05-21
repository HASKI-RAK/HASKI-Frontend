import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * postAddAllStudentsToCourse function.
 *
 * @returns - The HTTP Status
 *
 * @category Services
 */

export const postAddAllStudentsToCourse = async (courseId: number) => {
  return fetchData<Response>(getConfig().BACKEND + `/course/${courseId}/allStudents`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
