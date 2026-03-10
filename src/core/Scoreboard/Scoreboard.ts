import LearningElement from '../LearningElement/LearningElement'

type LastElement = {
  completed_at: string
  learning_element: Partial<LearningElement>
}

type BestAttempt = {
  score: number
  time_spent: number
  completed_at: string
  completion_status: boolean
}

type ScoreboardResponse = {
  score?: Record<string, number>
  max_score: Record<string, number>
  time_spent: Record<string, number>
  last_elements: Record<string, LastElement>
  best_attempts?: Record<string, BestAttempt>
}

type ScoreboardDataReturn = (
  userId: number,
  courseId?: number,
  topicId?: number,
  since?: Date,
  until?: Date
) => Promise<ScoreboardResponse>

export default ScoreboardResponse
export type { BestAttempt, LastElement, ScoreboardDataReturn, ScoreboardResponse }
