import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { handleError } from '@components'
import { BadgeResponse, BadgeVariant, StudentBadgeResponse } from '@core'
import { fetchStudentBadge, SnackbarContext } from '@services'
import { useStore } from '@store'
import BadgeSymbol from './BadgeSymbol'

type TopicBadgeListProps = {
  studentId?: number
  topicId?: number
}

const TopicBadgeList = ({ studentId, topicId }: TopicBadgeListProps) => {
  const getTopicBadges = useStore((state) => state.getTopicBadges)
  const [studentBadges, setStudentBadges] = useState<StudentBadgeResponse>([])
  const [topicBadges, setTopicBadges] = useState<BadgeResponse>([])
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    if (!topicId || !studentId) {
      return
    }
    getTopicBadges(topicId, false).then((badges) => {
      setTopicBadges(badges)
    })
    .catch((error) => {
      handleError(t, addSnackbar, 'error.fetchTopicBadges', error, 5000)
    })
    fetchStudentBadge(String(studentId)).then((badges) => {
      setStudentBadges(badges)
    })
    .catch((error) => {
      handleError(t, addSnackbar, 'error.fetchStudentBadges', error, 5000)
    })
  }, [getTopicBadges, studentId, topicId])

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      sx={{ mb: '1rem', mt: '1rem' }}
      alignItems={'center'}
      justifyContent={'center'}>
      <Typography variant="h6" sx={{ mb: '1rem' }}>
        {t('components.TopicBadgeList.topicBadges')}
      </Typography>
      <Grid container spacing={'1rem'} justifyContent="center">
        { (topicBadges && topicBadges.length > 0) ? (
        topicBadges.map((badge) => (
          <Grid item key={`${topicId}-${badge.variant_key}`}>
            <BadgeSymbol
              variant={badge.variant_key as BadgeVariant}
              achieved={studentBadges.some((sb) => sb.badge_id === badge.id)}
            />
          </Grid>
        ))) : (
          <Typography variant="body2">
            {t('components.TopicBadgeList.noBadgesAvailable')}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default memo(TopicBadgeList)
