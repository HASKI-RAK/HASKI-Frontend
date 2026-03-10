import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { GenericLeaderboard, GenericLeaderboardEntry } from '@core'

type BarChartProps = {
  leaderboardEntries: GenericLeaderboard
  currentStudentId?: number
  metricHeader?: string
}

export const BarChart = ({ leaderboardEntries, currentStudentId, metricHeader: metric = 'Metric' }: BarChartProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [maxValue, setMaxValue] = useState(0)
  const [dataErrorOccurred, setDataErrorOccurred] = useState(false)

  useEffect(() => {
    if (leaderboardEntries?.length > 0) {
      setMaxValue(Math.max(...leaderboardEntries.map((entry) => entry.metric)))
      setDataErrorOccurred(false)
    } else {
      setDataErrorOccurred(true)
    }
  }, [leaderboardEntries])

  return (
    <Grid container direction="column" justifyContent="center" mt="2rem" ml="2rem">
      {dataErrorOccurred ? (
        <Typography color="error">{t('components.barChart.dataError')}</Typography>
      ) : (
        <Grid width="35rem" height="60rem">
          <Box width="35rem" height="4rem" display="flex" alignItems="center">
            <Box width="10rem" height="4rem" display="flex" alignItems="center" gap="0.5rem">
              <Box width="3rem">
                <Typography variant="body2">{t('components.leaderboard.rank')}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box width="9rem">
                <Typography variant="body2">{t('components.leaderboard.studentId')}</Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width="20rem" height="4rem" display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body2">{metric}</Typography>
            </Box>
          </Box>
          {leaderboardEntries?.map((entry: GenericLeaderboardEntry) => {
            const barWidth = maxValue > 0 ? `${(entry.metric / maxValue) * 100}%` : '0%'
            return (
              <Box key={entry.student_id} width="35rem" height="4rem" display="flex" alignItems="center">
                <Box width="10rem" height="4rem" display="flex" alignItems="center" gap="0.5rem">
                  <Box width="3rem" justifyContent="center" alignItems="center" display="flex">
                    <Typography variant="body2">{entry.rank}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box width="9rem" justifyContent="center" alignItems="center" display="flex">
                    <Typography variant="body2">{`${entry.student_id}`}</Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width="20rem" height="4rem" display="flex" alignItems="center">
                  <Box
                    width={barWidth}
                    height="2rem"
                    bgcolor={
                      currentStudentId === entry.student_id ? theme.palette.primary.light : theme.palette.primary.main
                    }
                    borderRadius="0.5rem"
                    mr="0.5rem"
                  />
                </Box>
                <Box width="10rem" height="4rem" display="flex" alignItems="center" justifyContent="flex-end">
                  <Typography variant="body2">{entry.metric}</Typography>
                </Box>
              </Box>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}

export default memo(BarChart)
