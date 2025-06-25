type LearningElementRating = {
  learning_element_id: number
  topic_id: number
  rating_value: number
  rating_deviation: number
  timestamp: Date
}

type LearningElementRatingResponse = LearningElementRating[]

type LearningElementRatingReturn = (
  learningElementId?: number,
  topicId?: number
) => Promise<LearningElementRatingResponse>

export default LearningElementRating
export type { LearningElementRatingResponse, LearningElementRatingReturn }
