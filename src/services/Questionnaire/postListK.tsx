import { ListK } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

interface PostListKProps {
  studentId: number
  outputJson: string
}

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
