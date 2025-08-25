import { LearningElement } from '@core'

type LearningElementRecommendation = LearningElement[]

type LearningElementRecommendationResponse = LearningElementRecommendation

type LearningElementRecommendationReturn = (
  userId: number,
  courseId: number,
  topicId: number
) => Promise<LearningElementRecommendationResponse>

export default LearningElementRecommendation
export type { LearningElementRecommendationResponse, LearningElementRecommendationReturn }
