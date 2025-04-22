import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@common/components'

// TODO
const StudentRatingInfo = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h5">{t('components.StudentRatingInfo.dashboardTitle')}</Typography>
      <Typography variant="body1">{t('components.StudentRatingInfo.dashboardText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.StudentRatingInfo.ratingTitle')}
      </Typography>
      <Typography variant="body1">{t('components.StudentRatingInfo.ratingText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.StudentRatingInfo.spiderGraphTitle')}
      </Typography>
      <Typography variant="body1">{t('components.StudentRatingInfo.spiderGraphText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.StudentRatingInfo.histogramTitle')}
      </Typography>
      <Typography variant="body1">{t('components.StudentRatingInfo.histogramText')}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {t('components.StudentRatingInfo.lineGraphTitle')}
      </Typography>
      <Typography variant="body1">{t('components.StudentRatingInfo.lineGraphText')}</Typography>
    </>
  )
}

export default memo(StudentRatingInfo)
