import { ListK, ListKReturn } from '@core'
import { fetchData } from '../RequestResponse'
import { getConfig } from '@shared'

/*
  * Fetches the ListK for a student
  * @param {string} userId - user id
  * @param {string} lmsUserId - lms user id
  * @param {string} studentId - student id
  * @returns {Promise<ListK>} - returns a promise with the ListK
  * @throws {Error} - throws an error if userId, lmsUserId or studentId are not provided
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
