import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Button, Divider, Grid, IconButton, MobileStepper, Paper } from '@common/components'
import { Close, KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'
import { ChallengeTracker, LevelBar, XpLeaderboard } from '@components'
import { ExperiencePointsPostResponse } from '@core'
import { ILSContext } from '@services'
import { usePersistedStore } from '@store'

type GameSidePanelProps = {
  experiencePointDetails: ExperiencePointsPostResponse
  children?: React.ReactNode
}

type gameElementVisibility = {
  showLevelBar: boolean
  showChallengeTracker: boolean
  showLeaderboard: boolean
  showProgress: boolean
  showBadges: boolean
}

const GameSidePanel = ({ experiencePointDetails, children }: GameSidePanelProps) => {
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

  const [activeStep, setActiveStep] = useState<number>(0)
  const [expanded, setExpanded] = useState<boolean>(true)
  const [studentId, setStudentId] = useState<number>(0)
  const [elementVisibility, setElementVisibility] = useState<gameElementVisibility>({
    showLevelBar: false,
    showChallengeTracker: false,
    showLeaderboard: false,
    showProgress: false,
    showBadges: false
  })

  const handleNext = useCallback(() => {
    setActiveStep((prev) => prev + 1)
  }, [])

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1)
  }, [])

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
  }, [])

  const FirstPage = (
    <>
      <LevelBar studentId={studentId} experiencePointDetails={experiencePointDetails}></LevelBar>
      <Divider sx={{ marginTop: '0.5rem', mB: '0.5rem' }} />
      <ChallengeTracker objective="0/2 schwere Übungen abgeschlossen"></ChallengeTracker>
    </>
  )

  const SecondPage = (
    <>
      <XpLeaderboard></XpLeaderboard>
      <Grid sx={{ mt: '0.5rem', mb: '9.5rem' }}></Grid>
    </>
  )

  const expandedSidePanel = (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '25rem',
        height: { xxl: '18.5rem', xl: '18rem', lg: '15rem', md: '15rem' },
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
        {activeStep === 0 && FirstPage}
        {activeStep === 1 && SecondPage}
        <MobileStepper
          variant="dots"
          steps={2}
          activeStep={activeStep}
          nextButton={
            <Button onClick={handleNext} disabled={activeStep >= 1}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button onClick={handleBack} disabled={activeStep <= 0}>
              <KeyboardArrowLeft />
            </Button>
          }
          sx={{ position: 'absolute', bottom: '0.5rem', border: 'none' }}
        />
        {children}
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
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )

  return <>{expanded ? expandedSidePanel : collapsedSidePanel}</>
}

export default memo(GameSidePanel)
