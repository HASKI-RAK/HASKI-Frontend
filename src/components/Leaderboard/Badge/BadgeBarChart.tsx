import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Grid, Typography } from '@common/components'
import { BarChart, handleError } from '@components'
import { BadgeLeaderboardEntry, GenericLeaderboard, GenericLeaderboardEntry, League } from '@core'
import { fetchBadgeLeaderboard, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { useTheme } from '@common/hooks'

//Todo: translations
// max number of rows to display, if not set, display all rows
// overruled when there are 6 or less entries, then display all entries regardless of maxRows value
type BadgeBarChartProps = {
  maxRows?: number
  leaderboardEntries: GenericLeaderboard
}

export const BadgeBarChart = ({ maxRows }: BadgeBarChartProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)

  const leagueColor = {
    first: '#FFD700',
    second: '#a6b3ca',
    third: '#CD7F32',
    none: '#d4d4d4'
  }

  const [leaderboardEntries, setLeaderboardEntries] = useState<GenericLeaderboard>([])
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null)
  //const [totalParticipants, setTotalParticipants] = useState(0)
  const [league, setLeague] = useState('none' as League)
  const [isLoading, setIsLoading] = useState(true)
  const [displayedEntries, setDisplayedEntries] = useState<GenericLeaderboard>([])

  const updateDisplayedEntries = useCallback((student_id: number) => {
    if(leaderboardEntries.length === 0 ) return

    if(leaderboardEntries.length <= 6 || !maxRows) {
      setDisplayedEntries(leaderboardEntries)
    } else {
      const userIndex = leaderboardEntries.findIndex((entry) => entry.student_id === student_id)
      const limit = Math.min(maxRows, leaderboardEntries.length)
      const lowerhalfSize = Math.floor(limit / 2)
      const upperhalfSize = Math.min(limit - lowerhalfSize, leaderboardEntries.length - lowerhalfSize)
      const lowerIndex = Math.max(0, userIndex - lowerhalfSize)
      const lowerHalf = leaderboardEntries.slice(lowerIndex, userIndex)
      const upperHalf = leaderboardEntries.slice(userIndex, userIndex + upperhalfSize)
      setDisplayedEntries([...lowerHalf, ...upperHalf])
    }
  }, [leaderboardEntries, maxRows])

  useEffect(() => {
    getUser()
      .then((user) => {
        const userId = user.settings.user_id
        setCurrentStudentId(userId)
        fetchBadgeLeaderboard(userId)
          .then((response) => {
            const leaderboard = response.leaderboard.map((entry: BadgeLeaderboardEntry) => ({
              student_id: entry.student_id,
              metric: entry.badge_count,
              rank: entry.rank
            } as GenericLeaderboardEntry))
            setLeaderboardEntries(leaderboard)
            //setTotalParticipants(response.total_participants)
            setLeague(response.league)
            setIsLoading(false)
          })
          .catch((error) => {
            setIsLoading(false)
            handleError(t, addSnackbar, 'error.fetchBadgeLeaderboard', error, 3000)
          })
      })
      .catch((error) => {
        setIsLoading(false)
        handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
      })
  }, [])

  useEffect(() => {
    if (currentStudentId !== null) {
      updateDisplayedEntries(currentStudentId)
    }
  }, [currentStudentId, leaderboardEntries, maxRows])

  return (
    <Grid>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid>
          <Typography variant="h6" align="center">
            {t('components.badgeBarChart.title')}
          </Typography>
          <BarChart
            leaderboardEntries={displayedEntries}
            barColor={theme.palette.primary.main}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default memo(BadgeBarChart)
