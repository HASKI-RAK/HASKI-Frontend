import { LearningElement } from '@core'

type LearningElementRecommendation = LearningElement[]

type LearningElementRecommendationReturn = (
  userId: number,
  courseId: string,
  topicId: string
) => Promise<LearningElementRecommendation>

export default LearningElementRecommendation
export type { LearningElementRecommendation, LearningElementRecommendationReturn }
