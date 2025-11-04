import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, CircularProgress, Grid, Typography } from '@common/components'
import Leaderboard from './Leaderboard'
import { useRatingLeaderboard } from './RatingLeaderboard.hook'

const RatingLeaderboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { topicId } = useParams()

  const { currentStudentId, leaderboardRatings, loadRatings } = useRatingLeaderboard(setIsLoading)

  useEffect(() => {
    loadRatings(Number(topicId))
  }, [topicId, loadRatings])

  return (
    <Grid container direction={'column'}>
      <Typography variant="h6">{t('components.leaderboard.title')}</Typography>
      <Leaderboard
        currentStudentId={currentStudentId}
        leaderboardContent={leaderboardRatings}
        scoreHeadline={t('components.leaderboard.ratingHeader')}
      />
      <Button
        variant="text"
        size="small"
        sx={{ mt: '0.5rem' }}
        onClick={() => loadRatings(Number(topicId))}
        disabled={isLoading}>
        {isLoading ? <CircularProgress size={16} /> : t('components.leaderboard.refresh')}
      </Button>
      {/*
          <Button variant="text" size="small" sx={{ mt: '0.5rem' }}>
            {t('components.leaderboard.moreLeaderboards')}
          </Button>
          */}
    </Grid>
  )
}

export default memo(RatingLeaderboard)
