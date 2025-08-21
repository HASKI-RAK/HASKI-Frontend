import { Snackbar, Typography } from '@common/components'
import { useTranslation } from 'react-i18next'
import {  memo, useEffect, useState, useCallback } from 'react'

export type BadgeNotificationProps = {
  badgeQueue: string[]
}

const BadgeNotification = ({ badgeQueue }: BadgeNotificationProps) => {
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)
  const [remainingQueue, setRemainingQueue] = useState<string[]>([])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])



  return (
    <Snackbar
      open={badgeQueue.length > 0 && isVisible}
      onClose={handleClose}
      message={
        <>
          <img
            src={`path/to/your/image/${remainingQueue[0]}.png`}
            alt={t('components.badgeNotification.accessibilityLabel')}
          />
          <Typography variant="body1">
            {t(`components.badgeNotification.messages.${remainingQueue[0]}`)}
          </Typography>
          <Typography variant="body1">
            {`+ ${badgeQueue.length - 1} ` + t('components.badgeNotification.moreUnlocked')}
          </Typography>
        </>
      }
      autoHideDuration={3000}
    />
  )
}

export default memo(BadgeNotification)
