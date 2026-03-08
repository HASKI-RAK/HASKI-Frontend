import { Fragment, useCallback } from 'react'
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@common/components'
import { GenericLeaderboard, GenericLeaderboardEntry } from '@core'
import { useTranslation } from 'react-i18next'

type LeaderboardTableProps = {
  leaderboardEntries: GenericLeaderboard
  metricHeader: string
}

const LeaderboardTable = ({ leaderboardEntries, metricHeader }: LeaderboardTableProps) => {
  const { t } = useTranslation()
  const createTableRows = useCallback(() => {
    return leaderboardEntries.map((entry: GenericLeaderboardEntry, index: number, arr: GenericLeaderboard) => {
      const isLastEntry = index === arr.length - 1
      const hasRankGapToNext = !isLastEntry && entry.rank + 1 !== arr[index + 1].rank

      if (!hasRankGapToNext) {
        return (
          <TableRow key={entry.student_id}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>{entry.student_id}</TableCell>
            <TableCell>{entry.metric}</TableCell>
          </TableRow>
        )
      }

      return (
        <Fragment key={`entry-${entry.student_id}`}>
          <TableRow>
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

export default LeaderboardTable