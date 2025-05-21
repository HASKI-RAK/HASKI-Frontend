import { ILS } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * @props studentId - student id
 * @props outputJson - output json
 * @interface
 */
type PostILSProps = {
  studentId: number
  outputJson: string
}

/*
 * postILS function.
 *
 * @param studentId - student id
 * @param outputJson - output json
 *
 * @remarks
 * Posts the ILS for a student.
 * Throws an error if studentId or outputJson are not provided.
 *
 * @returns - returns a promise with the ILS
 *
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
