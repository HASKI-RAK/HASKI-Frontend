import { LearningElementSolution } from "@core"
import { getConfig } from "@shared"
import { fetchData } from "../RequestResponse"

/**
 * @prop learningElementId - learning element id
 * @prop solutionLmsId - solution lms id
 * @prop outputJson - output json
 * @interface
 */
type PostLearningElementSolutionProps = {
    learningElementLmsId: number
    solutionLmsId: number
    }

/**
 * postLearningElementSolution function.
 * 
 * @param learningElementId - learning element lms id
 * @param solutionLmsId - solution lms id
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
    solutionLmsId
}: PostLearningElementSolutionProps): Promise<LearningElementSolution> => {
    return fetchData<LearningElementSolution>(`${getConfig().BACKEND}/learningElement/${learningElementLmsId}/solution/${solutionLmsId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
}
