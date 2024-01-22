import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { ILS } from '@core'

/*
 * @param {string} studentId - student id
 * @param {string} outputJson - output json
 */
interface PostILSProps {
  studentId: number
  outputJson: string
}

/*
  * Posts the ILS for a student
  * @param {string} studentId - student id
  * @param {string} outputJson - output json
  * @returns {Promise<ILS>} - returns a promise with the ILS
  * @throws {Error} - throws an error if studentId or outputJson are not provided
  * @category Services
 */

export const postILS = async ({ studentId, outputJson }: PostILSProps): Promise<ILS> => {
  return fetchData<ILS>(getConfig().BACKEND + `/lms/student/${studentId}/questionnaire/ils`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
