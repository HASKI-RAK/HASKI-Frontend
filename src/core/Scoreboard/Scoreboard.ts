import LearningElement from '../LearningElement/LearningElement'

type LastElement = {
  completedAt: string
  learningElement: Partial<LearningElement>
}

type BestAttempt = {
  score: number
  timeSpent: number
  completedAt: string
  completionStatus: boolean
}

type ScoreboardResponse = {
  score?: Record<string, number>
  maxScore: Record<string, number>
  timeSpent: Record<string, number>
  lastElements: Record<string, LastElement>
  bestAttempts?: Record<string, BestAttempt>
}

type ScoreboardDataReturn = (
  userId: number,
  courseId?: number,
  courseLmsId?: number,
  topicId?: number,
  since?: Date,
  until?: Date
) => Promise<ScoreboardResponse>

export default ScoreboardResponse
export type { BestAttempt, LastElement, ScoreboardDataReturn, ScoreboardResponse }
