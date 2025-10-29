import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, LinearProgress, Tooltip, Typography } from '@common/components'
import { ExperiencePointsPostResponse } from '@core'
import { useStore } from '@store'

type LevelBarProps = {
  experiencePointDetails?: ExperiencePointsPostResponse
  studentId: number
}

const LevelBar = ({ studentId, experiencePointDetails: experiencePointsResult }: LevelBarProps) => {
  const [experiencePoints, setExperiencePoints] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [levelPercentage, setLevelPercentage] = useState(0)
  const { getExperiencePoints } = useStore(() => ({ getExperiencePoints: useStore.getState().getExperiencePoints }))

  const xpToNextLevel = 1000

  useEffect(() => {
    // fetch experience points
    getExperiencePoints(studentId).then((xpRecord) => {
      setExperiencePoints(xpRecord.experience_points)
    })
  }, [studentId, getExperiencePoints, experiencePointsResult])

  useEffect(() => {
    const level = Math.floor(experiencePoints / xpToNextLevel)
    setCurrentLevel(level)
    const remainingXp = experiencePoints % xpToNextLevel
    setLevelPercentage((remainingXp / xpToNextLevel) * 100)
  }, [experiencePoints])

  return (
    <Grid container direction="column" justifyContent={'center'} sx={{ position: 'relative' }}>
      <Grid item xs={12} justifyContent={'center'} sx={{ margin: 'auto' }}>
        <Typography variant="body1" color="text.secondary" fontWeight={'fontWeightBold'} justifyContent={'center'}>
          {'LVL ' + currentLevel}
        </Typography>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={levelPercentage}
        sx={{
          height: '0.5rem',
          borderRadius: 5,
          width: '100%',
          border: '0.2rem solid black',
          backgroundColor: 'white',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'black'
          }
        }}
      />
      <Grid item justifyContent={'center'} sx={{ mt: '0.5rem', margin: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{}}>
          {`${experiencePoints % xpToNextLevel} / ${xpToNextLevel}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default memo(LevelBar)
