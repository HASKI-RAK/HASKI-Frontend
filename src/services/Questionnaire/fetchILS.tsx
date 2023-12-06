import { ILS, ILSReturn } from '@core'
import { getData } from '../RequestResponse'
import { getConfig } from '@shared'

export const fetchILS: ILSReturn = async (userId, lmsUserId, studentId) => {
  const response = await fetch(
    getConfig().BACKEND + `/user/${userId}/${lmsUserId}/student/${studentId}/learningStyle`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const originalData = getData<ILS>(response)

  return originalData.then((originalData) => {
    const newData: ILS = {
      ...originalData,
      processing_value:
        originalData.processing_dimension === 'ref' ? -originalData.processing_value : originalData.processing_value,
      perception_value:
        originalData.perception_dimension === 'int' ? -originalData.perception_value : originalData.perception_value,
      input_value: originalData.input_dimension === 'vrb' ? -originalData.input_value : originalData.input_value,
      understanding_value:
        originalData.understanding_dimension === 'glb'
          ? -originalData.understanding_value
          : originalData.understanding_value
    }
    return newData
  })
}