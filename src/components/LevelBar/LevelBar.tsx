import { useEffect, useState } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, LinearProgress, LinearProgressProps, Tooltip, Typography } from '@common/components'

const LevelBar = () => {
  const { t } = useTranslation()

  const [experiencePoints, setExperiencePoints] = useState(3000)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [levelPercentage, setLevelPercentage] = useState(0)

  const xpToNextLevel = 500

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
        value={60}
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
          {'290/500'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default memo(LevelBar)
