import { ListK, ListKReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


/*
 * fetchListK function.
 *
 * @param userId - user id
 * @param lmsUserId - lms user id
 * @param studentId - student id
 *
 * @remarks
 * Fetches the ListK for a student.
 * Throws an error if userId, lmsUserId or studentId are not provided.
 *
 * @returns - returns a promise with the ListK.
 *
 * @category Services
 */
export const fetchListK: ListKReturn = async (userId, lmsUserId, studentId) => {
  return fetchData<ListK>(getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStrategy`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
