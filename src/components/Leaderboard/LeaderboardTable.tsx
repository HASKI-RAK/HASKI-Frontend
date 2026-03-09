import { memo, Fragment, useCallback } from 'react'
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@common/components'
import { GenericLeaderboard, GenericLeaderboardEntry } from '@core'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@common/hooks'

type LeaderboardTableProps = {
  leaderboardEntries: GenericLeaderboard
  metricHeader: string
  currentStudentId?: number
}

const LeaderboardTable = ({ leaderboardEntries, metricHeader, currentStudentId }: LeaderboardTableProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const createTableRows = useCallback(() => {
    return leaderboardEntries.map((entry: GenericLeaderboardEntry, index: number, arr: GenericLeaderboard) => {
      const isLastEntry = index === arr.length - 1
      const hasRankGapToNext = !isLastEntry && entry.rank + 1 !== arr[index + 1].rank

      if (!hasRankGapToNext) {
        return (
          <TableRow key={entry.student_id} sx={{ backgroundColor: currentStudentId === entry.student_id ? theme.palette.primary.light : 'inherit' }}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>{entry.student_id}</TableCell>
            <TableCell>{entry.metric}</TableCell>
          </TableRow>
        )
      }

      return (
        <Fragment key={`entry-${entry.student_id}`}>
          <TableRow sx={{ backgroundColor: currentStudentId === entry.student_id ? theme.palette.primary.light : 'inherit' }}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>{entry.student_id}</TableCell>
            <TableCell>{entry.metric}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{'...'}</TableCell>
            <TableCell>{'...'}</TableCell>
            <TableCell>{'...'}</TableCell>
          </TableRow>
        </Fragment>
      )
    })
  }, [leaderboardEntries])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('leaderboard.rank')}</TableCell>
              <TableCell>{t('leaderboard.studentId')}</TableCell>
              <TableCell>{metricHeader}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{createTableRows()}</TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default memo(LeaderboardTable)