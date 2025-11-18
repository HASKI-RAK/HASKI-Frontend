import { LearningPathElementSolution, LearningPathElementSolutionReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/*
 * fetchLearningPathElementSolution function.
 *
 * @param topicId - topic id
 *
 * @remarks
 * Fetches all learning element solutions for a given topic id.
 * Throws an error if topicId is not provided.
 *
 * @returns - returns a promise with an LearningPathElementSolution
 *
 * @category Services
 */

export const fetchLearningPathElementSolution: LearningPathElementSolutionReturn = async (topicId) => {
  if (!topicId) {
    throw new Error('topicId is required')
  }
  return fetchData<LearningPathElementSolution>(getConfig().BACKEND + `/topic/${topicId}/learningPath/solution`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
