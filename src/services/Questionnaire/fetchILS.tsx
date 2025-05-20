import { ILS, ILSReturn } from '@core'
import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'

/*
 * fetchILS function.
 *
 * @param userId - user id
 * @param lmsUserId - lms user id
 * @param studentId - student id
 *
 * @remarks
 * Fetches the ILS for a student.
 * Throws an error if userId, lmsUserId or studentId are not provided.
 *
 * @returns - returns a promise with the ILS
 *
 * @category Services
 */
export const fetchILS: ILSReturn = async (userId, lmsUserId, studentId) => {
  const originalData = await fetchData<ILS>(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStyle`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const newData: ILS = {
    ...originalData,
    processing_value:
      originalData.processing_dimension === 'ref' ? -originalData.processing_value : originalData.processing_value,
    perception_value:
      originalData.perception_dimension === 'int' ? -originalData.perception_value : originalData.perception_value,
    input_value: originalData.input_dimension === 'vrb' ? -originalData.input_value : originalData.input_value,
    understanding_value:
      originalData.understanding_dimension === 'glo'
        ? -originalData.understanding_value
        : originalData.understanding_value
  }
  return newData
}
