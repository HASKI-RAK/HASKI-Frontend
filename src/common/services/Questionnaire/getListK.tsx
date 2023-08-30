import { ListK } from '@core'
import { getData } from '../RequestResponse'
import { ListKReturn } from '../../core/QuestionnaireResults/ListK'

export const getListK: ListKReturn = async (userId, lmsUserId, studentId) => {
  const response = await fetch(
    process.env.BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStrategy`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return getData<ListK>(response)
}
