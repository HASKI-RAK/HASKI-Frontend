import { memo, useContext, useEffect, useState } from 'react'
import { ILSContext } from '@services'
import GameFeedbackBox from './GameFeebackBox/GameFeedbackBox'

export type GameFeedbackProps = {
    open: boolean
    onClose: () => void
}

const GameFeedback = ({ open, onClose }: GameFeedbackProps) => {
  const {
    reflectiveProcessing,
    globalUnderstanding,
    verbalInput
  } = useContext(ILSContext)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (reflectiveProcessing || globalUnderstanding || verbalInput) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [reflectiveProcessing, globalUnderstanding, verbalInput])

  return (
    <>
      {isVisible && <GameFeedbackBox open={open} onClose={onClose} />}
    </>
  )
}

export default memo(GameFeedback)