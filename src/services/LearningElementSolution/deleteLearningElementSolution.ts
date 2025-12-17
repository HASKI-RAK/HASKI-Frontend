import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

type DeleteLearningElementSolutionResponse = {
  message: string
}

/*
 * deleteLearningElementSolution function.
 *
 * @returns - message: string
 *
 * @category Services
 */

export const deleteLearningElementSolution = async (
  lmsLearningElementId: number
): Promise<DeleteLearningElementSolutionResponse> => {
  return fetchData<DeleteLearningElementSolutionResponse>(
    getConfig().BACKEND + `/learningElement/${lmsLearningElementId}/solution`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
