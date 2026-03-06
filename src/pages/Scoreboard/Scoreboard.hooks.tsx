import { useEffect, useState } from 'react'
import { BestAttempt, fetchScoreboardData, LastElement } from 'src/services/Dashboard/fetchScoreboardData'

export type ScoreboardHookReturn = {
  scores: Record<string, number>
  maxScores: Record<string, number>
  timesSpent: Record<string, number>
  lastElements: Record<string, LastElement>
  bestAttempts: Record<string, BestAttempt>
}

export type ScoreboardHookParams = {
  courseId?: number
  topicId?: number
  since?: Date
  until?: Date
}

export const useScoreboard = (params: ScoreboardHookParams): ScoreboardHookReturn => {
  const [scores, setScores] = useState<Record<string, number>>({})
  const [maxScores, setMaxScores] = useState<Record<string, number>>({})
  const [timesSpent, setTimesSpent] = useState<Record<string, number>>({})
  const [lastElements, setLastElements] = useState<Record<string, LastElement>>({})
  const [bestAttempts, setBestAttempts] = useState<Record<string, BestAttempt>>({})

  useEffect(() => {
    // todo getUser
    // todo only fetch if state are null?? prevents refetch on every render, but...
    fetchScoreboardData(1, 9, 5, params.since, params.until).then((data) => {
      setScores(data['score'] ?? {})
      setMaxScores(data['max_score'])
      setTimesSpent(data['time_spent'])
      setLastElements(data['last_elements'])
      setBestAttempts(data['best_attempts'] ?? {})
    })
  }, [fetchScoreboardData])

  return { scores, maxScores, timesSpent, lastElements, bestAttempts }
}
