import { Snackbar } from "@common/components"
import { ReactNode, memo, useEffect, useState, useCallback} from "react"

export type BadgeNotificationProps = {
  badge_queue: string[]
}


const BadgeNotification = ({
  badge_queue,
}: BadgeNotificationProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [remainingQueue, setRemainingQueue] = useState<string[]>([])

    const handleClose = useCallback(() => {
      setIsVisible(false)

    }, [])

    useEffect(() => {
        setRemainingQueue(badge_queue)
    }, [badge_queue])

    useEffect(() => {
  if (remainingQueue.length > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        handleClose()
        const updated_queue = remainingQueue.slice(1)
        setRemainingQueue(updated_queue) // maybe change so that badge_queue is changed instead
      }, 3000)

      return () => clearTimeout(timer)
    }
    return
  }, [remainingQueue, handleClose])

  return (
    <Snackbar
      open={badge_queue.length > 0 && isVisible}
      onClose={handleClose}
      message={badge_queue[0]}
    />
  )
}

export default memo(BadgeNotification)