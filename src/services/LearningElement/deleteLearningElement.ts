import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

type DeleteLearningElementResponse = {
  message: string
}

/*
 * postCourse function.
 *
 * @param outputJson - output json
 *
 * @returns - The created course
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
