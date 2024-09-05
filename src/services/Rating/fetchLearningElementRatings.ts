import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchLearningElementRatings: LearningElementRatingReturn = async () => {
  return fetchData<LearningElementRatingResponse>(getConfig().BACKEND + `/learningElement/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
