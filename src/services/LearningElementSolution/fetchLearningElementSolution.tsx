import { LearningElementSolution, LearningElementSolutionReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLearningElementSolution: LearningElementSolutionReturn = async (learningElementId: number) => {
  return fetchData<LearningElementSolution>(getConfig().BACKEND + `/learningElement/${learningElementId}/solution`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
