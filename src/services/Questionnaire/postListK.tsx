import { ListK } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

interface PostListKProps {
  studentId: number
  outputJson: string
}

export const postListK = async ({ studentId, outputJson }: PostListKProps): Promise<ListK> => {
  const response = await fetch(`${getConfig().BACKEND}/lms/student/${studentId}/questionnaire/listk`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })

  return getData<ListK>(response)
}
