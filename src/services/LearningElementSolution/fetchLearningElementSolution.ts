import { LearningElementSolution, LearningElementSolutionReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLearningElementSolution: LearningElementSolutionReturn = async (learningElementLmsId: number) => {
  return fetchData<LearningElementSolution>(getConfig().BACKEND + `/learningElement/${learningElementLmsId}/solution`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
