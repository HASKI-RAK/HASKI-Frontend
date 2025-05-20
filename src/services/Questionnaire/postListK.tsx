import { ListK } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostListKProps = {
  studentId: number
  outputJson: string
}

/*
 * postListK function.
 *
 * @param studentId - student id
 * @param outputJson - output json
 *
 * @remarks
 * Posts the ListK for a student
 * Throws an error if studentId or outputJson are not provided.
 *
 * @returns - returns a promise with the ListK.
 *
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
