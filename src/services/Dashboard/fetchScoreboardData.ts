import { LearningElement } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export type LastElement = {
  completed_at: string
  learning_element: Partial<LearningElement>
}

export type BestAttempt = {
  score: number
  time_spent: number
  completed_at: string
  completion_status: boolean
}

type ScoreboardDataResponse = {
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
) => Promise<ScoreboardDataResponse>

export const fetchScoreboardData: ScoreboardDataReturn = async (userId, courseId, topicId, since, until) => {
  const base = getConfig().BACKEND + `/user/${userId}/`
  const path =
    (topicId && `course/${courseId}/topic/${topicId}/scoreboard`) ||
    (courseId && `course/${courseId}/scoreboard`) ||
    'scoreboard'
  const url = new URL(base + path)
  if (since) url.searchParams.append('since', since.toISOString())
  if (until) url.searchParams.append('until', until.toISOString())

  return fetchData<ScoreboardDataResponse>(url.toString(), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
