import { memo, useContext, useEffect, useState } from 'react'
import { ExperiencePointsPostResponse } from '@core'
import { ILSContext } from '@services'
import GameFeedbackModal from './GameFeedbackModal/GameFeedbackModal'

export type GameFeedbackProps = {
  open: boolean
  onClose: () => void
  experiencePointDetails?: ExperiencePointsPostResponse
  startTime?: number
  endTime?: number
}

const GameFeedback = ({ open, onClose, experiencePointDetails, startTime, endTime }: GameFeedbackProps) => {
  const { reflectiveProcessing, globalUnderstanding, verbalInput } = useContext(ILSContext)

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
      {isVisible && (
        <GameFeedbackModal
          open={open}
          onClose={onClose}
          experiencePointDetails={experiencePointDetails}
          startTime={startTime}
          endTime={endTime}
        />
      )}
    </>
  )
}

export default memo(GameFeedback)
