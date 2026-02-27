import { Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { ExPointLeaderboardResponse } from '@core'
import { fetchXpLeaderboard, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { LeaderboardEntry } from './Leaderboard'

export const useXpLeaderboard = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const getUser = usePersistedStore((state) => state.getUser)
  const [leaderboardXp, setLeaderboardXp] = useState<LeaderboardEntry[]>([])
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null)

  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const createEntries = useCallback((data: ExPointLeaderboardResponse): LeaderboardEntry[] => {
    return data.leaderboard.map((entry) => ({
      rank: entry.rank,
      studentId: entry.student_id,
      scoredValue: entry.xp
    }))
  }, [])

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true)
    getUser().then((user) => {
      fetchXpLeaderboard(user.id)
        .then((leaderboard) => {
          setCurrentStudentId(user.id)
          setLeaderboardXp(createEntries(leaderboard))
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'components.leaderboard.xpLoadError', error, 5000)
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }, [getUser, t, addSnackbar, setIsLoading])

  return useMemo(
    () => ({
      currentStudentId,
      leaderboardXp,
      loadLeaderboard
    }),
    [currentStudentId, leaderboardXp, loadLeaderboard]
  )
}
