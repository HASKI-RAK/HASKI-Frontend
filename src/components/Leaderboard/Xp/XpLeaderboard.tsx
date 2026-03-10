import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Grid, Typography } from '@common/components'
import { BarChart, handleError, LeaderboardTable } from '@components'
import { GenericLeaderboard, GenericLeaderboardEntry, League } from '@core'
import { fetchXpLeaderboard, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

type XpLeaderboardProps = {
  maxRows?: number
  showVisually: boolean
}

export const XpLeaderboard = ({ maxRows, showVisually }: XpLeaderboardProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)

  const leagueColor = {
    first: '#FFD700',
    second: '#a6b3ca',
    third: '#CD7F32',
    none: '#d4d4d4',
    unranked: '#d4d4d4'
  }

  const [leaderboardEntries, setLeaderboardEntries] = useState<GenericLeaderboard>([])
  const [currentStudentId, setCurrentStudentId] = useState<number | undefined>(undefined)
  //const [totalParticipants, setTotalParticipants] = useState(0)
  const [league, setLeague] = useState('none' as League)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredEntries, setFilteredEntries] = useState<GenericLeaderboard>([])

  const updateDisplayedEntries = useCallback(
    (student_id: number) => {
      if (leaderboardEntries.length === 0) return

      if (leaderboardEntries.length <= 6 || !maxRows) {
        setFilteredEntries(leaderboardEntries)
      } else {
        const userIndex = leaderboardEntries.findIndex((entry) => entry.student_id === student_id)
        const limit = Math.min(maxRows, leaderboardEntries.length)
        const lowerhalfSize = Math.floor(limit / 2)
        const upperhalfSize = Math.min(limit - lowerhalfSize, leaderboardEntries.length - lowerhalfSize)
        const lowerIndex = Math.max(0, userIndex - lowerhalfSize)
        const lowerHalf = leaderboardEntries.slice(lowerIndex, userIndex)
        const upperHalf = leaderboardEntries.slice(userIndex, userIndex + upperhalfSize)
        setFilteredEntries([...lowerHalf, ...upperHalf])
      }
    },
    [leaderboardEntries, maxRows]
  )

  useEffect(() => {
    getUser()
      .then((user) => {
        const student_id = user.id
        setCurrentStudentId(student_id)
        fetchXpLeaderboard(student_id)
          .then((response) => {
            const leaderboard = response.leaderboard.map(
              (entry) =>
                ({
                  student_id: entry.student_id,
                  metric: entry.experience_points,
                  rank: entry.rank
                } as GenericLeaderboardEntry)
            )
            setLeaderboardEntries(leaderboard)
            //setTotalParticipants(response.total_participants)
            setLeague(response.league)
            setIsLoading(false)
          })
          .catch((error) => {
            setIsLoading(false)
            handleError(t, addSnackbar, 'error.fetchXpLeaderboard', error, 3000)
          })
      })
      .catch((error) => {
        setIsLoading(false)
        handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
      })
  }, [])

  useEffect(() => {
    if (currentStudentId !== undefined) {
      updateDisplayedEntries(currentStudentId)
    }
  }, [currentStudentId, leaderboardEntries, maxRows])

  return isLoading ? (
    <Grid>
      <CircularProgress />
    </Grid>
  ) : (
    <Grid alignItems="center" justifyContent="center">
      <Typography variant="h5" component="h2">
        {t('components.xpLeaderboard.title')}
      </Typography>
      {showVisually ? (
        <BarChart
          leaderboardEntries={filteredEntries}
          currentStudentId={currentStudentId}
          metricHeader={t('components.xpLeaderboard.metric')}
        />
      ) : (
        <LeaderboardTable
          leaderboardEntries={filteredEntries}
          metricHeader={t('components.xpLeaderboard.metric')}
          currentStudentId={currentStudentId}
        />
      )}
    </Grid>
  )
}

export default memo(XpLeaderboard)
