import { memo, useContext, useEffect, useState } from 'react'
import { ExperiencePointsPostResponse } from '@core'
import { ILSContext } from '@services'
import { usePersistedStore } from '@store'
import CollapsedGameSidePanel from './CollapsedGameSidePanel'
import ExpandedGameSidePanel from './ExpandedGameSidePanel'
import { useGameSidePanel } from './GameSidePanelHooks'

type GameSidePanelProps = {
  attemptDuration?: number
  experiencePointDetails?: ExperiencePointsPostResponse
}

type gameElementVisibility = {
  showLevelBar: boolean
  showChallengeTracker: boolean
  showLeaderboard: boolean
  showProgress: boolean
  showBadges: boolean
}

const GameSidePanel = ({ attemptDuration, experiencePointDetails }: GameSidePanelProps) => {
  const getUser = usePersistedStore((state) => state.getUser)

  const {
    activeProcessing,
    reflectiveProcessing,
    sensingPerception,
    intuitivePerception,
    sequentialUnderstanding,
    globalUnderstanding,
    visualInput,
    verbalInput
  } = useContext(ILSContext)

  const [expanded, setExpanded] = useState<boolean>(true)
  const [studentId, setStudentId] = useState<number>(0)
  const [elementVisibility, setElementVisibility] = useState<gameElementVisibility>({
    showLevelBar: false,
    showChallengeTracker: false,
    showLeaderboard: false,
    showProgress: false,
    showBadges: false
  })

  const { collapse, expand } = useGameSidePanel({ setExpanded })

  useEffect(() => {
    // fetching user ID to use as student ID since they tend to be the same
    // should be replaced in the future
    getUser().then((user) => {
      setStudentId(user.id)
    })
    setElementVisibility({
      showLevelBar: sensingPerception || intuitivePerception || sequentialUnderstanding || visualInput || verbalInput,
      showChallengeTracker: activeProcessing || sensingPerception || intuitivePerception || verbalInput,
      showLeaderboard: activeProcessing || intuitivePerception || sequentialUnderstanding,
      showProgress: reflectiveProcessing || globalUnderstanding || visualInput,
      showBadges: sensingPerception || sequentialUnderstanding || visualInput
    })
  }, [ILSContext, getUser])

  return (
    <>
      {expanded ? (
        <ExpandedGameSidePanel
          attemptDuration={attemptDuration}
          collapse={collapse}
          studentId={studentId}
          experiencePointDetails={experiencePointDetails}
        />
      ) : (
        <CollapsedGameSidePanel expand={expand} />
      )}
    </>
  )
}

export default memo(GameSidePanel)
