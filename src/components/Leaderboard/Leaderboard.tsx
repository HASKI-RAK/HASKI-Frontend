import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@common/components'

export type LeaderboardEntry = {
  studentId: number
  scoredValue: number
}

type LeaderboardProps = {
  currentStudentId: number | null
  leaderboardContent: LeaderboardEntry[]
  scoreHeadline: string
}

const Leaderboard = ({ currentStudentId, leaderboardContent, scoreHeadline }: LeaderboardProps) => {
  const { t } = useTranslation()

  return (
    <Grid container direction={'column'}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('component.leaderboard.userHeader')}</TableCell>
            <TableCell align="center">{scoreHeadline}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardContent.map((row) => (
            <TableRow key={row.studentId} sx={{ height: '0.5rem' }}>
              <TableCell align="center">{`${
                currentStudentId === row.studentId ? t('component.leaderboard.you') : row.studentId
              }`}</TableCell>
              <TableCell align="center">{row.scoredValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default memo(Leaderboard)
