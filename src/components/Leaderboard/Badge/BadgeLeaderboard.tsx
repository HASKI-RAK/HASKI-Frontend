import { memo, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@common/components'
import { handleError } from '@components'
import { BadgeLeaderboardEntry, League } from '@core'
import { fetchBadgeLeaderboard, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

export const BadgeLeaderboard = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  //  const containerRef = useRef<HTMLDivElement>(null)
  const getUser = usePersistedStore((state) => state.getUser)

  const leagueColor = {
    first: '#FFD700',
    second: '#C0C0C0',
    third: '#CD7F32',
    none: '#d4d4d4'
  }

  const [leaderboardEntries, setLeaderboardEntries] = useState<BadgeLeaderboardEntry[]>([])
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [league, setLeague] = useState('none' as League)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUser()
      .then((user) => {
        const studentId = user.settings.user_id
        fetchBadgeLeaderboard(studentId)
          .then((response) => {
            setLeaderboardEntries(response.leaderboard)
            setTotalParticipants(response.total_participants)
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          {t('badgeLeaderboard.title')}
        </Typography>
      </Grid>
      {isLoading ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('badgeLeaderboard.rank')}</TableCell>
                <TableCell>{t('badgeLeaderboard.student')}</TableCell>
                <TableCell>{t('badgeLeaderboard.badgeCount')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardEntries.map((entry) => (
                <TableRow key={entry.student_id}>
                  <TableCell>{entry.rank}</TableCell>
                  <TableCell>{entry.student_id}</TableCell>
                  <TableCell>{entry.badge_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      )}
    </Grid>
  )
}
export default memo(BadgeLeaderboard)
