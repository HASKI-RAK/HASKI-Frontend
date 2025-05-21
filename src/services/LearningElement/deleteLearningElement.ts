import { getConfig } from '@shared'

import { fetchData } from '../RequestResponse'


type DeleteLearningElementResponse = {
  message: string
}

/*
 * deleteLearningElement function.
 *
 * @returns - message: string
 *
 * @category Services
 */

export const deleteLearningElement = async (
  learningElementId: number,
  lmsLearningElementId: number
): Promise<DeleteLearningElementResponse> => {
  return fetchData<DeleteLearningElementResponse>(
    getConfig().BACKEND + `/lms/learningElement/${learningElementId}/${lmsLearningElementId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
