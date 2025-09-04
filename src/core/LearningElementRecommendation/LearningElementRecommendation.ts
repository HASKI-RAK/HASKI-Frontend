import { LearningElement } from '@core'

type LearningElementRecommendation = LearningElement[]

type LearningElementRecommendationResponse = LearningElementRecommendation

type LearningElementRecommendationReturn = (
  userId: number,
  courseId: string,
  topicId: string
) => Promise<LearningElementRecommendationResponse>

export default LearningElementRecommendation
export type { LearningElementRecommendationResponse, LearningElementRecommendationReturn }
