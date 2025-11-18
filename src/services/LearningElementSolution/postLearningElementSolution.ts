import { LearningElementSolution } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * @prop learningElementId - learning element id
 * @prop outputJson - output json contains solution_lms_id, activity_type
 * @interface
 */
type PostLearningElementSolutionProps = {
  learningElementLmsId: number
  outputJson: string
}

/**
 * postLearningElementSolution function.
 *
 * @param learningElementId - learning element lms id
 * @param outputJson - output should provide solution_lms_id and activity type of Solution Learning Element
 *
 * @remarks
 * Posts the solution to be set for a specific learning element.
 *
 * @returns - returns a promise with the changed data entry.
 *
 * @category Services
 */

export const postLearningElementSolution = async ({
  learningElementLmsId,
  outputJson
}: PostLearningElementSolutionProps): Promise<LearningElementSolution> => {
  return fetchData<LearningElementSolution>(`${getConfig().BACKEND}/learningElement/${learningElementLmsId}/solution`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: outputJson
  })
}
