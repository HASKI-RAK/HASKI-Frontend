import {ListK} from '@core'
import {getData} from "../RequestResponse";

interface PostListKProps {
  studentId: number
  outputJson: string
}

export const postListK = async ({ studentId, outputJson }: PostListKProps): Promise<ListK> => {
    const response = await fetch(`${process.env.BACKEND}/lms/student/${studentId}/questionnaire/listk`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: outputJson
    })

    return getData<ListK>(response)
}
