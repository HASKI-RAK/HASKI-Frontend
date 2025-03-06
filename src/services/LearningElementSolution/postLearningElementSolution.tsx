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
    learningElementId: number
    solutionLmsId: number
    }

/**
 * postLearningElementSolution function.
 * 
 * @param learningElementId - learning element id
 * @param solutionLmsId - solution lms id
 * @param outputJson - output json
 * 
 * @remarks
 * Posts the solution to be set for a specific learning element.
 * 
 * @returns - returns a promise with the changed data entry.
 * 
 * @category Services
 */

export const postLearningElementSolution = async ({
    learningElementId: learningElementLmsId,
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
