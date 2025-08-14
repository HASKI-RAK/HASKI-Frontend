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
    <Grid container direction="column" justifyContent={'center'}>
      <Grid container alignItems="center" direction="row" justifyContent={'center'}>
        <LinearProgress
          variant="determinate"
          value={60}
          sx={{
            height: '0.8rem',
            borderRadius: 5,
            width: '25rem',
            border: '0.2rem solid black',
            backgroundColor: 'white',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'black'
            },
            marginRight: '1rem'
          }}
        />
        <Typography variant="body1" color="text.secondary" fontWeight={'fontWeightBold'}>
          {'LVL ' + currentLevel}
        </Typography>
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '17rem' }}>
        {'290/500'}
      </Typography>
    </Grid>
  )
}

export default memo(LevelBar)
