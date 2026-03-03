import { memo, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Grid, Typography } from '@common/components'
import { BarChart, handleError } from '@components'
import { BadgeLeaderboardEntry, League } from '@core'
import { fetchBadgeLeaderboard, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

//Todo: translations

export const BadgeBarChart = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  //const containerRef = useRef<HTMLDivElement>(null)

  const getUser = usePersistedStore((state) => state.getUser)

  const leagueColor = {
    first: '#FFD700',
    second: '#a6b3ca',
    third: '#CD7F32',
    none: '#d4d4d4'
  }

  const [leaderboardEntries, setLeaderboardEntries] = useState<BadgeLeaderboardEntry[]>([])
  //const [totalParticipants, setTotalParticipants] = useState(0)
  const [league, setLeague] = useState('none' as League)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUser()
      .then((user) => {
        const userId = user.settings.user_id
        fetchBadgeLeaderboard(userId)
          .then((response) => {
            setLeaderboardEntries(response.leaderboard)
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
            barValues={leaderboardEntries.map((entry) => entry.badge_count)}
            yAxisLabels={leaderboardEntries.map((entry) => String(entry.rank))}
            barColor={leagueColor[league]}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default memo(BadgeBarChart)
