import { memo, useContext, useEffect, useState } from 'react'
import { Node } from 'reactflow'
import { Divider, Grid, IconButton, Paper } from '@common/components'
import { Close, ExpandMore } from '@common/icons'
import { LevelBar, TopicBadgeList, VerbalProgress } from '@components'
import { BadgeVariant, ExperiencePointsPostResponse } from '@core'
import { ILSContext } from '@services'
import { usePersistedStore } from '@store'
import { useGameSidePanel } from './GameSidePanelHooks'

type GameSidePanelProps = {
  experiencePointDetails?: ExperiencePointsPostResponse
  learningPathElements?: Node[]
  numberOfLearningPathElements: number
  topicId?: string
  studentBadgeKeys: BadgeVariant[]
}

type gameElementVisibility = {
  showLevelBar: boolean
  showChallengeTracker: boolean
  showLeaderboard: boolean
  showProgress: boolean
  showBadges: boolean
}

const GameSidePanel = ({
  experiencePointDetails,
  learningPathElements,
  numberOfLearningPathElements,
  topicId,
  studentBadgeKeys
}: GameSidePanelProps) => {
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

  const expandedSidePanel = (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '25rem',
        height: '20rem',
        position: 'absolute',
        mr: '1rem'
      }}>
      <Grid
        container
        item
        direction="column"
        sx={{
          mt: '0.5rem',
          ml: '1rem',
          mr: '1rem',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          maxWidth: '22rem'
        }}>
        <Grid container justifyContent={'right'} sx={{ mb: '1rem' }}>
          <IconButton onClick={() => setExpanded(false)} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Close />
          </IconButton>
        </Grid>
        <LevelBar studentId={studentId} experiencePointDetails={experiencePointDetails}></LevelBar>
        <Divider sx={{ marginTop: '0.5rem', mB: '0.5rem' }} />
        {studentId && topicId && elementVisibility.showBadges ? (
          <TopicBadgeList
            studentId={studentId}
            topicId={topicId ? Number(topicId) : undefined}
            badgesAsKeys={studentBadgeKeys}
          />
        ) : (
          <VerbalProgress
            learningPathElements={learningPathElements}
            numberOfLearningPathElements={numberOfLearningPathElements}
          />
        )}
      </Grid>
    </Paper>
  )

  const collapsedSidePanel = (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '2.5rem',
        height: '2.5rem',
        position: 'absolute',
        mr: '1rem'
      }}>
      <Grid container item direction="column" sx={{ mt: '0.5rem', ml: '1rem', mr: '1rem' }}>
        <Grid container justifyContent={'right'} sx={{ mb: '1rem' }}>
          <IconButton onClick={() => setExpanded(true)} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <ExpandMore />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )

  return <>{expanded ? expandedSidePanel : collapsedSidePanel}</>
}

export default memo(GameSidePanel)
