import { ListK } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * @param {string} studentId - student id
  * @param {string} outputJson - output json
 */
interface PostListKProps {
  studentId: number
  outputJson: string
}

/*
  * Posts the ListK for a student
  * @param {string} studentId - student id
  * @param {string} outputJson - output json
  * @returns {Promise<ListK>} - returns a promise with the ListK
  * @throws {Error} - throws an error if studentId or outputJson are not provided
  * @category Services
 */

export const postListK = async ({ studentId, outputJson }: PostListKProps): Promise<ListK> => {
  return fetchData<ListK>(`${getConfig().BACKEND}/lms/student/${studentId}/questionnaire/listk`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
