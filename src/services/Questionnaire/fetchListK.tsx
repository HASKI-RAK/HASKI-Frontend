import { ListK, ListKReturn } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchListK: ListKReturn = async (userId, lmsUserId, studentId) => {
  const response = await fetch(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStrategy`,
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
