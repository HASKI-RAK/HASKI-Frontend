import { ListK, ListKReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchListK: ListKReturn = async (userId, lmsUserId, studentId) => {
  return fetchData<ListK>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStrategy`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
