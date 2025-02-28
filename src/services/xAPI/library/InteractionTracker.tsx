import { useCallback, useEffect, useState } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

// TODO: Document this component
export const UserInteractionTracker = ({ componentFilePath, componentType, pageName }: XAPIComponentProps) => {
  // States.
  const [lastKeyStroke, setLastKeyStroke] = useState<number>(Date.now())
  const [lastMouseMove, setLastMouseMove] = useState<number>(Date.now())

  // Hook.
  // ? Hier die id festlegen?
  const { sendStatement } = useXAPI({
    componentID: 'user-interaction-tracker',
    componentFilePath,
    componentType,
    pageName
  })

  // Sent statement on mouse move every 30 seconds.
  const handleMouseMove = useCallback(() => {
    const now = Date.now()

    if (now - lastMouseMove > 3000) {
      // TODO: Set to 30000.
      sendStatement('moved')
      setLastMouseMove(now)
    }
  }, [lastMouseMove, setLastMouseMove, sendStatement])

  // Sent statement on key stroke every 1 minute.
  const handleKeyStroke = useCallback(() => {
    const now = Date.now()

    if (now - lastKeyStroke > 1000) {
      // TODO: Set to 100000.
      sendStatement('changed')
      setLastKeyStroke(now)
    }
  }, [lastKeyStroke, setLastKeyStroke, sendStatement])

  // Add and remove event listeners.
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyStroke)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyStroke)
    }
  }, [handleMouseMove, handleKeyStroke, sendStatement])

  return null
}
