type LearningElementRating = {
  value: number
  deviation: number
  timestamp: Date
}

type LearningElementRatingResponse = {
  learningElementRatings: LearningElementRating[]
}

type LearningElementRatingReturn = (
  learningElementId?: number,
  topicId?: number
) => Promise<LearningElementRatingResponse>

export default LearningElementRating
export type { LearningElementRatingReturn, LearningElementRatingResponse }
