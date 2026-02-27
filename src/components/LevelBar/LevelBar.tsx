import { memo, useEffect, useState } from 'react'
import { Grid, LinearProgress, Typography } from '@common/components'
import { ExperiencePointsPostResponse } from '@core'

type LevelAnimationState = {
  currentLevel: number
  remainingExperiencePoints: number
  progress: number
  progressBuffer: number
}

type LevelBarProps = {
  experiencePointDetails?: ExperiencePointsPostResponse
  studentId: number
}

const LevelBar = ({ studentId, experiencePointDetails }: LevelBarProps) => {
  const [animationState, setAnimationState] = useState<LevelAnimationState>({
    currentLevel: 0,
    remainingExperiencePoints: 0,
    progress: 0,
    progressBuffer: 0
  })
  const [firstRender, setFirstRender] = useState(true)

  const xpToNextLevel = 1000
  const displayFactor = (1 / xpToNextLevel) * 100

  useEffect(() => {
    // initialize level and progress based on total XP on first render
    if (experiencePointDetails != undefined) {
      if (firstRender) {
        const initialAnimationState: LevelAnimationState = {
          currentLevel: Math.floor(experiencePointDetails.total_xp / xpToNextLevel),
          remainingExperiencePoints: 0,
          progress: experiencePointDetails.total_xp % xpToNextLevel,
          progressBuffer: experiencePointDetails.total_xp % xpToNextLevel
        }
        setAnimationState(initialAnimationState)
        setFirstRender(false)
      }
    }
  }, [studentId, experiencePointDetails, firstRender, xpToNextLevel])

  useEffect(() => {
    console.log('experiencePointDetails changed', experiencePointDetails)
    setAnimationState((previousState) => {
      const experienceGained = experiencePointDetails ? experiencePointDetails.gained_xp : 0
      return {
        ...previousState,
        progressBuffer: Math.min(previousState.progressBuffer + experienceGained, xpToNextLevel),
        remainingExperiencePoints: previousState.remainingExperiencePoints + experienceGained
      }
    })
  }, [experiencePointDetails])

  useEffect(() => {
    // If there are no remaining XP to animate, do nothing
    if (animationState.remainingExperiencePoints <= 0) return

    const timer = setTimeout(() => {
      setAnimationState((previousState) => {
        // Stop consuming XP when buffer is reached
        if (previousState.progress >= previousState.progressBuffer && previousState.progress < xpToNextLevel) {
          return previousState
        }

        // Level up and update buffer if we've reached the XP needed for next level
        if (previousState.progress >= xpToNextLevel) {
          const nextLevel = previousState.currentLevel + 1
          const nextBuffer = Math.min(xpToNextLevel, previousState.remainingExperiencePoints)

          return {
            ...previousState,
            currentLevel: nextLevel,
            progress: 0,
            progressBuffer: nextBuffer
          }
        }

        // Increase progress toward buffer and decrease remaining XP
        const nextRemaining = previousState.remainingExperiencePoints - 1
        const nextProgress = previousState.progress + 1

        return {
          ...previousState,
          remainingExperiencePoints: nextRemaining,
          progress: nextProgress
        }
      })
    }, 10)

    return () => clearTimeout(timer)
  }, [animationState])

  return (
    <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ position: 'relative' }}>
      <Grid item xs={12} justifyContent={'center'} sx={{ margin: 'auto' }}>
        <Typography variant="body1" color="text.secondary" fontWeight={'fontWeightBold'} justifyContent={'center'}>
          {'LVL ' + (animationState.currentLevel + 1) /* Levels start at 1 */}
        </Typography>
      </Grid>
      <LinearProgress
        variant="buffer"
        value={animationState.progress * displayFactor}
        valueBuffer={animationState.progressBuffer * displayFactor}
        sx={{
          height: '0.5rem',
          borderRadius: 5,
          position: 'relative',
          width: '95%',
          border: '0.2rem solid black',
          backgroundColor: 'white',
          '& .MuiLinearProgress-dashed': {
            display: 'none'
          },
          '& .MuiLinearProgress-bar1Buffer': {
            backgroundColor: 'black'
          },
          '& .MuiLinearProgress-bar2Buffer': {
            backgroundColor: 'lightgray'
          }
        }}
      />
      <Grid item justifyContent={'center'} sx={{ mt: '0.5rem', margin: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{}}>
          {`${animationState.progress} / ${xpToNextLevel}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default memo(LevelBar)
