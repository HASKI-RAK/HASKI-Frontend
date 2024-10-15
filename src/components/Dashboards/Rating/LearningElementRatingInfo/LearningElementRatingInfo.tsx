import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@common/components'

const LearningElementRatingInfo = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h5">{t('components.LearningElementRatingInfo.dashboardTitle')}</Typography>
      <Typography variant="body1">{t('components.LearningElementRatingInfo.dashboardText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.LearningElementRatingInfo.ratingTitle')}
      </Typography>
      <Typography variant="body1">{t('components.LearningElementRatingInfo.ratingText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.LearningElementRatingInfo.spiderGraphTitle')}
      </Typography>
      <Typography variant="body1">{t('components.LearningElementRatingInfo.spiderGraphText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.LearningElementRatingInfo.lineGraphTitle')}
      </Typography>
      <Typography variant="body1">{t('components.LearningElementRatingInfo.lineGraphText')}</Typography>
    </>
  )
}

export default memo(LearningElementRatingInfo)
