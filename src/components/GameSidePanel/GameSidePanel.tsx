import { memo, useContext, useEffect, useState } from 'react'
import { ExperiencePointsPostResponse, GamificationSettings } from '@core'
import { ILSContext } from '@services'
import { usePersistedStore } from '@store'
import CollapsedGameSidePanel from './CollapsedGameSidePanel'
import ExpandedGameSidePanel from './ExpandedGameSidePanel'
import { useGameSidePanel } from './GameSidePanelHooks'

type GameSidePanelProps = {
  attemptDuration?: number
  experiencePointDetails?: ExperiencePointsPostResponse
}

const GameSidePanel = ({ attemptDuration, experiencePointDetails }: GameSidePanelProps) => {
  const getUser = usePersistedStore((state) => state.getUser)
  const getGamificationSettings = usePersistedStore((state) => state.getGamificationSettings)

  const { reflectiveProcessing, sensingPerception, verbalInput } = useContext(ILSContext)

  const [expanded, setExpanded] = useState<boolean>(true)
  const [studentId, setStudentId] = useState<number>(0)
  const [showExperiencePointDetails, setShowExperiencePointDetails] = useState<boolean>(false)

  const { collapse, expand } = useGameSidePanel({ setExpanded })

  useEffect(() => {
    getUser().then((user) => {
      setStudentId(user.id)
      getGamificationSettings(user.id).then((gamificationSettings: GamificationSettings) => {
        if (gamificationSettings.information === undefined) {
          setShowExperiencePointDetails(reflectiveProcessing || sensingPerception || verbalInput)
        } else {
          setShowExperiencePointDetails(gamificationSettings.information === 'detailed')
        }
      })
    })
  }, [ILSContext, getUser, getGamificationSettings])

  return (
    <>
      {expanded ? (
        <ExpandedGameSidePanel
          attemptDuration={attemptDuration}
          collapse={collapse}
          studentId={studentId}
          experiencePointDetails={experiencePointDetails}
          showExperiencePointDetails={showExperiencePointDetails}
        />
      ) : (
        <CollapsedGameSidePanel expand={expand} />
      )}
    </>
  )
}

export default memo(GameSidePanel)
