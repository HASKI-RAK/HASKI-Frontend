import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { ILS } from '@core'

interface PostILSProps {
  studentId: number
  outputJson: string
}

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
