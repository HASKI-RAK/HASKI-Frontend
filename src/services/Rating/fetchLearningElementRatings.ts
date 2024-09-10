import { LearningElementRatingResponse, LearningElementRatingReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

/**
 * # fetchLearningElementRatings service
 *
 * Fetches all learning element ratings from the backend.
 *
 * @remarks
 * Returns an empty array, if there are no ratings present.
 */
export const fetchLearningElementRatings: LearningElementRatingReturn = async () => {
  return fetchData<LearningElementRatingResponse>(getConfig().BACKEND + `/learningElement/rating`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
