import { memo, useCallback, useState } from 'react'
import { Button, Divider, Grid, IconButton, MobileStepper, Paper, Typography } from '@common/components'
import { Close, KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'
import { ChallengeTracker, Leaderboard, LevelBar } from '@components'

type GameSidePanelProps = {
  children?: React.ReactNode
}

const GameSidePanel = ({ children }: GameSidePanelProps) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [expanded, setExpanded] = useState<boolean>(true)

  const handleNext = useCallback(() => {
    setActiveStep((prev) => prev + 1)
  }, [])

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1)
  }, [])

  const FirstPage = (
    <>
      <LevelBar></LevelBar>
      <Divider sx={{ marginTop: '0.5rem', mB: '0.5rem' }} />
      <ChallengeTracker objective="0/2 schwere Übungen abgeschlossen"></ChallengeTracker>
    </>
  )

  const SecondPage = (
    <>
      <Typography variant="h6" sx={{ mt: '0.5rem', mb: '0.5rem' }}>
        Leaderboards
      </Typography>
      <Leaderboard></Leaderboard>
      <Grid sx={{ mt: '0.5rem', mb: '9.5rem' }}></Grid>
    </>
  )

  const expandedSidePanel = (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '18rem',
        height: { xxl: '18.5rem', xl: '18rem', lg: '15rem', md: '15rem' },
        position: 'absolute',
        mr: '1rem'
      }}>
      <Grid item direction="column" sx={{ mt: '0.5rem', ml: '1rem', mr: '1rem' }}>
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
      <Grid item direction="column" sx={{ mt: '0.5rem', ml: '1rem', mr: '1rem' }}>
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
