import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, CircularProgress, Grid, Typography } from '@common/components'
import Leaderboard from './Leaderboard'
import { useXpLeaderboard } from './xpLeaderboard.hooks'

const XpLeaderboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { topicId } = useParams()

  const { currentStudentId, leaderboardXp, loadLeaderboard } = useXpLeaderboard(setIsLoading)

  useEffect(() => {
    loadLeaderboard()
  }, [topicId, loadLeaderboard])

  return (
    <Grid container direction={'column'} sx={{ position: 'relative' }} justifyContent="center" alignItems="center">
      <Typography variant="h6">{t('component.leaderboard.title')}</Typography>
      <Leaderboard
        currentStudentId={currentStudentId}
        leaderboardContent={leaderboardXp}
        scoreHeadline={t('component.leaderboard.xpHeader')}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ mt: '0.5rem', width: '10rem' }}
        onClick={() => loadLeaderboard()}
        disabled={isLoading}>
        {isLoading ? <CircularProgress size={16} /> : t('component.leaderboard.refresh')}
      </Button>
      {/*
          <Button variant="text" size="small" sx={{ mt: '0.5rem' }}>
            {t('component.leaderboard.moreLeaderboards')}
          </Button>
          */}
    </Grid>
  )
}

export default memo(XpLeaderboard)
