import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { BestAttempt, LastElement } from '@core'
import { fetchScoreboardData, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

export type ScoreboardHookReturn = {
  scores: Record<string, number>
  maxScores: Record<string, number>
  timesSpent: Record<string, number>
  lastElements: Record<string, LastElement>
  bestAttempts: Record<string, BestAttempt>
  isLoading: boolean
}

export type ScoreboardHookParams = {
  courseId?: number
  topicId?: number
  since?: Date
  until?: Date
}

export const useScoreboard = (params: ScoreboardHookParams): ScoreboardHookReturn => {
  // Translation
  const { t } = useTranslation()

  // Context
  const { addSnackbar } = useContext(SnackbarContext)

  // Store
  const getUser = usePersistedStore((state) => state.getUser)

  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [maxScores, setMaxScores] = useState<Record<string, number>>({})
  const [timesSpent, setTimesSpent] = useState<Record<string, number>>({})
  const [lastElements, setLastElements] = useState<Record<string, LastElement>>({})
  const [bestAttempts, setBestAttempts] = useState<Record<string, BestAttempt>>({})

  // todo only fetch if state are null?? prevents refetch on every render, but...
  useEffect(() => {
    getUser()
      .then((user) => {
        fetchScoreboardData(user.id, params.courseId, params.topicId, params.since, params.until)
          .then((data) => {
            setScores(data['score'] ?? {})
            setMaxScores(data['max_score'])
            setTimesSpent(data['time_spent'])
            setLastElements(data['last_elements'])
            setBestAttempts(data['best_attempts'] ?? {})
            setIsLoading(false)
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchScoreboard', error, 5000)
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 5000)
      })
  }, [getUser, fetchScoreboardData])

  return { scores, maxScores, timesSpent, lastElements, bestAttempts, isLoading }
}
