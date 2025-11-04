import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Slide, Snackbar, Typography } from '@common/components'
import { BadgeSymbol } from '@components'
import { BadgeVariant } from '@core'
import { ILSContext } from '@services'

export type BadgeNotificationProps = {
  badgeQueue: string[]
  //topicName?: string
}

const BadgeNotification = ({ badgeQueue }: BadgeNotificationProps) => {
  const { t } = useTranslation()

  const { sensingPerception, visualInput, sequentialUnderstanding } = useContext(ILSContext)

  const [isVisible, setIsVisible] = useState(false)
  const [queuePosition, setQueuePosition] = useState(0)

  const [userVisibility, setUserVisibility] = useState(sensingPerception || sequentialUnderstanding || visualInput)

  useEffect(() => {
    setUserVisibility(sensingPerception || sequentialUnderstanding || visualInput)
  }, [sensingPerception, sequentialUnderstanding, visualInput])

  useEffect(() => {
    setQueuePosition(0)
    if (badgeQueue.length > 0) {
      setIsVisible(true)
    }
  }, [badgeQueue])

  // Show notification after position resets or advances
  useEffect(() => {
    if (badgeQueue.length > 0 && queuePosition < badgeQueue.length) {
      setIsVisible(true)
    }
  }, [queuePosition, badgeQueue.length])

  const handleClose = useCallback(() => {
    setIsVisible(false)

    if (queuePosition < badgeQueue.length - 1) {
      setTimeout(() => {
        setQueuePosition((prev) => prev + 1)
      }, 300)
    }
  }, [queuePosition, badgeQueue.length])

  // Don't render if no badges or invalid position
  if (badgeQueue.length === 0 || queuePosition >= badgeQueue.length) {
    return null
  }

  const currentBadge = badgeQueue[queuePosition] as BadgeVariant
  const remainingBadges = badgeQueue.length - queuePosition - 1

  return (
    <Snackbar
      open={isVisible && userVisibility}
      onClose={handleClose}
      TransitionComponent={Slide}
      sx={{ borderRadius: '1rem' }}
      message={
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          justifyContent={'left'}
          sx={{ gap: '1rem', borderRadius: '0.5rem', minWidth: '35rem' }}>
          <Grid sx={{ bgcolor: 'success.main', borderRadius: '0.5rem', p: 1 }}>
            <BadgeSymbol variant={currentBadge} achieved={true} />
          </Grid>
          <Typography variant="body1">{t(`components.BadgeNotification.${currentBadge}`)}</Typography>
          <Typography variant="body1">{t(`components.BadgeNotification.badge`)}</Typography>
          {remainingBadges > 0 && (
            <Typography variant="body1">
              {`+ ${remainingBadges} ` + t('components.BadgeNotification.moreUnlocked')}
            </Typography>
          )}
          <Typography variant="body1">{t('components.BadgeNotification.unlocked')}</Typography>
        </Grid>
      }
      autoHideDuration={5000}
    />
  )
}

export default memo(BadgeNotification)
