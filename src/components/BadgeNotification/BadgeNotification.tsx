import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Snackbar, Typography } from '@common/components'

export type BadgeNotificationProps = {
  badgeQueue: string[]
  topicName?: string
}

const BadgeNotification = ({ badgeQueue, topicName }: BadgeNotificationProps) => {
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)
  const [queuePosition, setQueuePosition] = useState(0)

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

  const currentBadge = badgeQueue[queuePosition]
  const remainingBadges = badgeQueue.length - queuePosition - 1

  return (
    <Snackbar
      open={isVisible}
      onClose={handleClose}
      message={
        <>
          <img
            src={`path/to/your/image/${currentBadge}.png`}
            alt={t('components.badgeNotification.accessibilityLabel')}
          />
          <Typography variant="body1">
            {(topicName ? topicName : '') + t(`components.badgeNotification.messages.${currentBadge}`)}
          </Typography>
          {remainingBadges > 0 && (
            <Typography variant="body1">
              {`+ ${remainingBadges} ` + t('components.badgeNotification.moreUnlocked')}
            </Typography>
          )}
        </>
      }
      autoHideDuration={5000}
    />
  )
}

export default memo(BadgeNotification)
