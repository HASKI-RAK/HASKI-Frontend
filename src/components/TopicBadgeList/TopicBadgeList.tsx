import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { BadgeResponse, BadgeVariant, StudentBadgeResponse } from '@core'
import { fetchStudentBadge } from '@services'
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

  useEffect(() => {
    if (!topicId || !studentId) {
      return
    }
    getTopicBadges(topicId, false).then((badges) => {
      setTopicBadges(badges)
    })
    fetchStudentBadge(String(studentId)).then((badges) => {
      setStudentBadges(badges)
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
        {topicBadges.map((badge) => (
          <Grid item key={badge.variant_key}>
            <BadgeSymbol
              variant={badge.variant_key as BadgeVariant}
              achieved={studentBadges.some((sb) => sb.badge_id === badge.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default memo(TopicBadgeList)
